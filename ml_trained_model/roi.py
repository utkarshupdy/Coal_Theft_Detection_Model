import cv2
import numpy as np

# Initialize video capture (0 for primary camera)
cap = cv2.VideoCapture(0)

# Read the first frame
ret, prev_frame = cap.read()
prev_gray = cv2.cvtColor(prev_frame, cv2.COLOR_BGR2GRAY)

# Set parameters for the pipeline
motion_threshold = 500    # Minimum contour area for motion
flow_magnitude_threshold = 1.5  # Threshold for optical flow magnitude to trigger alert

while True:
    # Capture the current frame
    ret, frame = cap.read()
    if not ret:
        break

    # Convert current frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # ----------------- Step 1: Motion Detection -----------------
    diff_frame = cv2.absdiff(prev_gray, gray)
    _, thresh_frame = cv2.threshold(diff_frame, 30, 255, cv2.THRESH_BINARY)
    thresh_frame = cv2.GaussianBlur(thresh_frame, (5, 5), 0)

    # Find contours of the motion areas
    contours, _ = cv2.findContours(thresh_frame, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Draw bounding boxes for detected motion
    for contour in contours:
        if cv2.contourArea(contour) > motion_threshold:
            (x, y, w, h) = cv2.boundingRect(contour)
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
            print("Motion Detected: Alert Triggered")  # Trigger an alert for motion detection

    # ----------------- Step 2: Optical Flow Detection -----------------
    flow = cv2.calcOpticalFlowFarneback(prev_gray, gray, None, 0.5, 3, 15, 3, 5, 1.2, 0)

    # Convert flow to polar coordinates (magnitude and angle)
    mag, ang = cv2.cartToPolar(flow[..., 0], flow[..., 1])
    hsv = np.zeros_like(frame)
    hsv[..., 1] = 255
    hsv[..., 0] = ang * 180 / np.pi / 2
    hsv[..., 2] = cv2.normalize(mag, None, 0, 255, cv2.NORM_MINMAX)
    optical_flow_frame = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

    # Check if average flow magnitude exceeds threshold for alert
    avg_flow_magnitude = np.mean(mag)
    if avg_flow_magnitude > flow_magnitude_threshold:
        print("Optical Flow Change Detected: Alert Triggered")  # Trigger alert based on optical flow

    # ----------------- Display Results -----------------
    cv2.imshow("Motion Detection", frame)
    cv2.imshow("Optical Flow", optical_flow_frame)

    # Update previous frame for next iteration
    prev_gray = gray

    # Exit on pressing 'q'
    if cv2.waitKey(10) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
