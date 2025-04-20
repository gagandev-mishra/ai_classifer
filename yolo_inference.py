import torch
import pandas as pd

# Load YOLOv5s model from Ultralytics (pretrained)
model = torch.hub.load('ultralytics/yolov5', 'yolov5s', source='github', force_reload=False)

def detect_objects(image_path: str):
    results = model(image_path)
    detections = results.pandas().xyxy[0]

    output = []
    for _, row in detections.iterrows():
        output.append({
            "label": row["name"],
            "confidence": float(row["confidence"]),
        })

    return output
