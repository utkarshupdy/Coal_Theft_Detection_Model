import cv2
from ultralytics import YOLO
import mediapipe as mp

# Load the YOLOv8 model for human detection
model = YOLO('yolov8n.pt').cuda()

# Initialize Mediapipe Face Detection
mp_face_detection = mp.solutions.face_detection
face_detection = mp_face_detection.FaceDetection(model_selection=0, min_detection_confidence=0.5)
# url = "http:/192.168.137.232:8080/video"
# Set up local video capture (using the default webcam)
cap = cv2.VideoCapture(0)

# Define the target frame size
target_width, target_height = 640, 480

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Resize the frame to the target size
    frame = cv2.resize(frame, (target_width, target_height))

    # Perform human detection with YOLOv8
    results = model(frame)

    # Process YOLO results for human detection
    for res in results:
        boxes = res.boxes
        for i, r in enumerate(boxes.xyxy):  # Get bounding boxes
            r = r.cpu().tolist()  # Convert to list
            confidence = boxes.conf[i].item()  # Get confidence score
            class_id = int(boxes.cls[i].item())  # Get class ID

            # Check if the detected class is human (class ID 0 is typically 'person' in COCO dataset)
            if class_id == 0 and confidence >= 0.5:
                x1, y1, x2, y2 = map(int, r)  # Extract box coordinates
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(frame, f'Human: {confidence:.2f}', (x1, y1 - 10), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    # Perform face detection using Mediapipe
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    face_results = face_detection.process(rgb_frame)

    # Draw bounding boxes for detected faces
    if face_results.detections:
        for detection in face_results.detections:
            bboxC = detection.location_data.relative_bounding_box
            h, w, _ = frame.shape
            x, y, width, height = int(bboxC.xmin * w), int(bboxC.ymin * h), int(bboxC.width * w), int(bboxC.height * h)
            cv2.rectangle(frame, (x, y), (x + width, y + height), (255, 0, 0), 2)
            confidence = detection.score[0] if detection.score else 0
            cv2.putText(frame, f'Face: {confidence:.2f}', (x, y - 10), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

    # Display the frame with detections
    cv2.imshow('YOLO and Mediapipe Detection', frame)

    # Break loop on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release resources
cap.release()
cv2.destroyAllWindows()
