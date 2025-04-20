import torch
import os
import uuid
import shutil

model = torch.hub.load('ultralytics/yolov5', 'yolov5s', source='github', force_reload=False)

def detect_objects(path):
    results = model(path)
    detections = results.pandas().xyxy[0]
    return [{"label": row["name"], "confidence": float(row["confidence"])}
            for _, row in detections.iterrows()] if not detections.empty else []

async def yolo_classify_logic(file):
    filename = f"temp_{uuid.uuid4()}.jpg"
    with open(filename, "wb") as f:
        shutil.copyfileobj(file.file, f)
    try:
        result = detect_objects(filename)
        return {"results": result or "No objects detected"}
    except Exception as e:
        return {"error": f"YOLO error: {str(e)}"}
    finally:
        os.remove(filename)
