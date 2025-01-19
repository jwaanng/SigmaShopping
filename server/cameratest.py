import math
import cv2
import base64
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from ultralytics import YOLO  # Adjust based on your YOLO version

app = Flask(__name__)
socketio = SocketIO(app)

# Enable CORS for the frontend
CORS(app, origins="http://localhost:3000")

# Initialize SocketIO with the CORS setting
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")

# List of classes for object detection
classNames = ["person", "bicycle", "car", "motorbike", "aeroplane", "bus", "train", "truck", "boat",
              "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat",
              "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella",
              "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite", "baseball bat",
              "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle", "wine glass", "cup",
              "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli",
              "carrot", "hot dog", "pizza", "donut", "cake", "chair", "sofa", "pottedplant", "bed",
              "diningtable", "toilet", "tvmonitor", "laptop", "mouse", "remote", "keyboard", "cell phone",
              "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors",
              "teddy bear", "hair drier", "toothbrush"]

food_classes = ["banana", "apple", "sandwich", "orange", "broccoli", "carrot", "hot dog", "pizza", "donut", "cake"]

def detect_food_from_camera(camera_url):
    cap = cv2.VideoCapture(camera_url)
    if not cap.isOpened():
        emit('error', {'error': 'Failed to open camera'})
        return

    cap.set(3, 640)  # Width
    cap.set(4, 480)  # Height

    try:
        model = YOLO("yolo-Weights/yolov8n.pt")
    except Exception as e:
        emit('error', {'error': f'Error loading YOLO model: {e}'})
        return

    classNames = ["person", "bicycle", "car", "motorbike", "aeroplane", "bus", "train", "truck", "boat",
                  "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat",
                  "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella",
                  "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite", "baseball bat",
                  "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle", "wine glass", "cup",
                  "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli",
                  "carrot", "hot dog", "pizza", "donut", "cake", "chair", "sofa", "pottedplant", "bed",
                  "diningtable", "toilet", "tvmonitor", "laptop", "mouse", "remote", "keyboard", "cell phone",
                  "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors",
                  "teddy bear", "hair drier", "toothbrush"]

    food_classes = ["banana", "apple", "sandwich", "orange", "broccoli", "carrot", "hot dog", "pizza", "donut", "cake"]

    while True:
        success, img = cap.read()
        if not success:
            emit('error', {'error': 'Failed to capture image'})
            break

        results = model(img, stream=True)

        results_list = []

        for r in results:
            boxes = r.boxes

            for box in boxes:
                cls = int(box.cls[0])
                class_name = classNames[cls]

                if class_name in food_classes:
                    x1, y1, x2, y2 = box.xyxy[0]
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

                    confidence = math.ceil((box.conf[0]*100))/100

                    results_list.append({
                        "class_name": class_name,
                        "confidence": confidence,
                        "coordinates": [x1, y1, x2, y2]
                    })

        emit('results', {'results': results_list})

        # Convert the frame to base64 for streaming
        _, buffer = cv2.imencode('.jpg', img)  # Encode the frame as JPEG
        frame_base64 = base64.b64encode(buffer).decode('utf-8')  # Convert to base64 string

        emit('frame', {'image': frame_base64})  # Emit the image to the frontend

        if cv2.waitKey(1) == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

@socketio.on('connect')
def on_connect(sid):
    print(f"Client connected: {sid}")
    # Start detecting food when a client connects
    detect_food_from_camera(0)

@socketio.on('disconnect')
def on_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)