import cv2
import numpy as np
from ultralytics import YOLO
from collections import deque

# Load the YOLOv8 segmentation model
model = YOLO(r"D:\Codeutsav\dead\weights\best.pt").cuda()

# Initialize video capture
# url = "http:/192.168.137.232:8080/video"
cap = cv2.VideoCapture(0)
# Read the first frame for optical flow
ret, prev_frame = cap.read()
prev_masked_frame = np.zeros_like(prev_frame)
prev_masked_gray = cv2.cvtColor(prev_masked_frame, cv2.COLOR_BGR2GRAY)

# Parameters
flow_magnitude_threshold = 1.5
confidence_threshold = 0.5

# Mask averaging parameters
mask_history_size = 5
mask_history = deque(maxlen=mask_history_size)
avg_mask = None
mask_threshold = 0.2  # Threshold for the averaged mask

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Perform segmentation
    results = model.predict(frame, conf=confidence_threshold, show=False)
    
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
                instance_mask = (instance_mask > 0).astype(np.float32)
                current_mask = np.maximum(current_mask, instance_mask)

    # Add current mask to history
    mask_history.append(current_mask)
    
    # Calculate average mask
    if len(mask_history) > 0:
        avg_mask = np.mean(mask_history, axis=0)
        # Apply threshold to average mask
        thresholded_mask = (avg_mask > mask_threshold).astype(np.uint8)
        
        # Apply the thresholded mask to the frame
        masked_frame[thresholded_mask > 0] = frame[thresholded_mask > 0]

    # Convert masked frame to grayscale for optical flow
    masked_gray = cv2.cvtColor(masked_frame, cv2.COLOR_BGR2GRAY)

    # Calculate optical flow on masked frames
    flow = cv2.calcOpticalFlowFarneback(prev_masked_gray, 
                                      masked_gray, 
                                      None, 
                                      0.5, 3, 15, 3, 5, 1.2, 0)

    # Convert flow to polar coordinates
    mag, ang = cv2.cartToPolar(flow[..., 0], flow[..., 1])
    
    # Apply threshold to magnitude for noise reduction
    mag[mag < flow_magnitude_threshold] = 0

    # Create optical flow visualization
    hsv = np.zeros_like(masked_frame)
    hsv[..., 1] = 255
    hsv[..., 0] = ang * 180 / np.pi / 2
    hsv[..., 2] = cv2.normalize(mag, None, 0, 255, cv2.NORM_MINMAX)
    optical_flow_frame = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

    # Check if average flow magnitude exceeds threshold
    avg_flow_magnitude = np.mean(mag)
    if avg_flow_magnitude > flow_magnitude_threshold:
        print(f"Movement detected: {avg_flow_magnitude:.2f}")

    # Create visualization of average mask
    avg_mask_vis = np.zeros_like(frame)
    if avg_mask is not None:
        avg_mask_vis[..., 2] = (avg_mask * 255).astype(np.uint8)  # Visualize in red channel

    # Stack frames in two rows
    top_row = np.hstack((frame, masked_frame))
    bottom_row = np.hstack((optical_flow_frame, avg_mask_vis))
    combined_view = np.vstack((top_row, bottom_row))
    
    # Add labels
    font = cv2.FONT_HERSHEY_SIMPLEX
    font_scale = 0.8
    font_thickness = 2
    font_color = (255, 255, 255)

    # Add labels to the frames
    cv2.putText(combined_view, 'Original', (10, 30), font, font_scale, font_color, font_thickness)
    cv2.putText(combined_view, 'Masked', (frame.shape[1] + 10, 30), font, font_scale, font_color, font_thickness)
    cv2.putText(combined_view, f'{avg_flow_magnitude}', (10, frame.shape[0] + 30), font, font_scale, font_color, font_thickness)
    cv2.putText(combined_view, 'Average Mask', (frame.shape[1] + 10, frame.shape[0] + 30), font, font_scale, font_color, font_thickness)
    
    # Resize combined view to fit laptop screen (e.g., 1280x720)
    desired_width = 1400
    desired_height = 800
    combined_view = cv2.resize(combined_view, (desired_width, desired_height))
    cv2.imshow("Multiple Views", combined_view)

    # Update previous frame
    prev_masked_gray = masked_gray.copy()

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()