from flask import Flask, Response
import cv2
import numpy as np

app = Flask(__name__)

# Initialize video capture
cap = cv2.VideoCapture(0)  # Use 0 for the default camera

def generate_frames():
    while True:
        # Read the frame from the camera
        success, frame = cap.read()
        if not success:
            break
        
        # Process the frame (e.g., grayscale conversion, blurring)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        edges = cv2.Canny(blurred, 50, 150)
        
        # Find contours
        contours, _ = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        # Create a mask for the trolley section
        masked_frame = frame.copy()

        for contour in contours:
            area = cv2.contourArea(contour)
            if area > 5000:  # Adjust based on your specific requirements
                x, y, w, h = cv2.boundingRect(contour)
                cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

                mask = np.zeros_like(masked_frame)
                cv2.drawContours(mask, [contour], -1, (255, 255, 255), thickness=cv2.FILLED)
                masked_frame = cv2.bitwise_and(masked_frame, mask)

        # Combine the original frame and the masked frame
        combined_frame = np.hstack((frame, masked_frame))

        # Encode the frame in JPEG format
        ret, buffer = cv2.imencode('.jpg', combined_frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def index():
    return "<h1>Streaming Video</h1><img src='/video_feed'>"

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    try:
        app.run(host='0.0.0.0', port=5000, debug=True)
    finally:
        cap.release()
        cv2.destroyAllWindows()
