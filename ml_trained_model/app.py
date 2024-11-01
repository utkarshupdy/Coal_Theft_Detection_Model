from flask import Flask, Response, jsonify, render_template
import cv2
import threading
import time
import numpy as np
from ultralytics import YOLO
from collections import deque
import mediapipe as mp

app = Flask(__name__)
url = 'http/192.168.137.196:8080/video'
# Global variable for camera
camera = cv2.VideoCapture(url)  # Adjust camera ID based on your setup
camera_lock = threading.Lock()

# Load the YOLOv8 segmentation model
model = YOLO(r"D:\Codeutsav\dead\weights\best.pt").cuda()
# Load the YOLOv8 model for person detection
model_person = YOLO('yolov8n.pt').cuda()

# Initialize Mediapipe Face Detection
mp_face_detection = mp.solutions.face_detection
face_detection = mp_face_detection.FaceDetection(model_selection=0, min_detection_confidence=0.5)

# Parameters for optical flow and mask averaging
mask_history_size = 10
mask_history = deque(maxlen=mask_history_size)
mask_threshold = 0.5  # Threshold for the averaged mask
prev_masked_frame = None

def generate_frames(processing_function):
    """Shared frame generation function."""
    while True:
        with camera_lock:
            ret, frame = camera.read()
        if not ret:
            continue
        
        # Process the frame using the provided processing function
        processed_frame = processing_function(frame)

        # Encode the processed frame as JPEG
        _, buffer = cv2.imencode('.jpg', processed_frame)
        frame_data = buffer.tobytes()

        # Yield the frame in a multipart format
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_data + b'\r\n')

def process_basic(frame):
    """Basic processing for raw video feed."""
    return frame  # No processing for the basic stream

def process_person_face_detection(frame):
    """Processing for person and face detection."""
    results = model_person(frame)
    for res in results:
        boxes = res.boxes
        for i, r in enumerate(boxes.xyxy):  # Get bounding boxes
            r = r.cpu().tolist()  # Convert to list
            confidence = boxes.conf[i].item()  # Get confidence score
            class_id = int(boxes.cls[i].item())  # Get class ID

            if class_id == 0 and confidence >= 0.8:  # Class ID 0 is 'person'
                x1, y1, x2, y2 = map(int, r)  # Extract box coordinates
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(frame, f'Human: {confidence:.2f}', (x1, y1 - 10), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    face_results = face_detection.process(rgb_frame)

    if face_results.detections:
        for detection in face_results.detections:
            bboxC = detection.location_data.relative_bounding_box
            h, w, _ = frame.shape
            x, y, width, height = int(bboxC.xmin * w), int(bboxC.ymin * h), int(bboxC.width * w), int(bboxC.height * h)
            cv2.rectangle(frame, (x, y), (x + width, y + height), (255, 0, 0), 2)
            confidence = detection.score[0] if detection.score else 0
            cv2.putText(frame, f'Face: {confidence:.2f}', (x, y - 10), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)
    
    return frame

def process_truck_segmentation(frame):
    """Processing for truck segmentation."""
    global prev_masked_frame
    # Perform segmentation
    results = model.predict(frame, conf=0.8, show=False)

    # Create a blank frame for current mask
    current_mask = np.zeros((frame.shape[0], frame.shape[1]), dtype=np.float32)
    masked_frame = np.zeros_like(frame)

    # Process segmentation results
    for r in results:
        masks = r.masks.data.cpu().numpy() if r.masks is not None else None
        
        if masks is not None:
            for mask in masks:
                # Resize and threshold the mask
                instance_mask = cv2.resize(mask, (frame.shape[1], frame.shape[0]))
                instance_mask = (instance_mask > 0.5).astype(np.float32)
                current_mask = np.maximum(current_mask, instance_mask)

    # Add current mask to history
    mask_history.append(current_mask)
    
    # Calculate average mask
    if len(mask_history) > 0:
        avg_mask = np.mean(mask_history, axis=0)
        thresholded_mask = (avg_mask > mask_threshold).astype(np.uint8)
        masked_frame[thresholded_mask > 0] = frame[thresholded_mask > 0]

    # Optical flow processing
    if prev_masked_frame is not None:
        masked_gray = cv2.cvtColor(masked_frame, cv2.COLOR_BGR2GRAY)
        flow = cv2.calcOpticalFlowFarneback(prev_masked_frame, masked_gray, None, 0.5, 3, 15, 3, 5, 1.2, 0)
        mag, ang = cv2.cartToPolar(flow[..., 0], flow[..., 1])

        # Create optical flow visualization
        hsv = np.zeros_like(masked_frame)
        hsv[..., 1] = 255
        hsv[..., 0] = ang * 180 / np.pi / 2
        hsv[..., 2] = cv2.normalize(mag, None, 0, 255, cv2.NORM_MINMAX)
        optical_flow_frame = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

    else:
        optical_flow_frame = np.zeros_like(frame)  # No flow to calculate for the first frame

    # Update previous masked frame
    prev_masked_frame = cv2.cvtColor(masked_frame, cv2.COLOR_BGR2GRAY)

    return masked_frame  # Return the masked frame for streaming

# Basic streaming route for raw video feed
@app.route('/stream', methods=['GET'])
def basic_stream():
    return Response(generate_frames(process_basic), mimetype='multipart/x-mixed-replace; boundary=frame')

# Stream route for continuous person and face detection
@app.route('/detect_person_stream', methods=['GET'])
def detect_person_face_stream():
    return Response(generate_frames(process_person_face_detection), mimetype='multipart/x-mixed-replace; boundary=frame')

# Stream route for continuous truck segmentation
@app.route('/segment_truck_stream', methods=['GET'])
def segment_truck_stream():
    return Response(generate_frames(process_truck_segmentation), mimetype='multipart/x-mixed-replace; boundary=frame')

# Cleanup route to release the camera
@app.route('/shutdown', methods=['POST'])
def shutdown():
    global camera
    with camera_lock:
        camera.release()
    return jsonify({"status": "Camera released"})

# Ensure the camera is released on server shutdown
@app.teardown_appcontext
def release_camera(exception=None):
    global camera
    with camera_lock:
        camera.release()
        
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
