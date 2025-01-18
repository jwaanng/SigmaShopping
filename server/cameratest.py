from flask import Flask, request, jsonify
import cv2
import math
from ultralytics import YOLO

app = Flask(__name__)

def detect_food_from_camera(camera_url):
    # For webcame, use 0
    # start IP camera
    cap = cv2.VideoCapture(camera_url)
    cap.set(3, 640)
    cap.set(4, 480)

    # model
    try:
        model = YOLO("yolo-Weights/yolov8n.pt")
    except Exception as e:
        return {"error": f"Error loading YOLO model: {e}"}

    # object classes
    classNames = ["person", "bicycle", "car", "motorbike", "aeroplane", "bus", "train", "truck", "boat",
                  "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat",
                  "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella",
                  "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite", "baseball bat",
                  "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle", "wine glass", "cup",
                  "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli",
                  "carrot", "hot dog", "pizza", "donut", "cake", "chair", "sofa", "pottedplant", "bed",
                  "diningtable", "toilet", "tvmonitor", "laptop", "mouse", "remote", "keyboard", "cell phone",
                  "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors",
                  "teddy bear", "hair drier", "toothbrush"
                  ]

    # food-related classes
    food_classes = ["banana", "apple", "sandwich", "orange", "broccoli", "carrot", "hot dog", "pizza", "donut", "cake"]

    results_list = []

    while True:
        success, img = cap.read()
        if not success:
            return {"error": "Failed to capture image"}

        results = model(img, stream=True)

        # coordinates
        for r in results:
            boxes = r.boxes

            for box in boxes:
                cls = int(box.cls[0])
                class_name = classNames[cls]

                if class_name in food_classes:
                    x1, y1, x2, y2 = box.xyxy[0]
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2) # convert to int values

                    # confidence
                    confidence = math.ceil((box.conf[0]*100))/100

                    results_list.append({
                        "class_name": class_name,
                        "confidence": confidence,
                        "coordinates": [x1, y1, x2, y2]
                    })

        if cv2.waitKey(1) == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    return {"results": results_list}

@app.route('/detect_food', methods=['POST'])
def detect_food():
    data = request.json
    camera_url = data.get('camera_url')
    if not camera_url:
        return jsonify({"error": "camera_url is required"}), 400

    results = detect_food_from_camera(camera_url)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)

# # Example usage ################################################################
# camera_url = ... # TODO: INSERT CAMERA URL HERE 
# # default camera is 0
# detect_food_from_camera(camera_url)