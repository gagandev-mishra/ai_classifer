import torch
from torchvision import models, transforms
from PIL import Image
from io import BytesIO
import requests
import os
from fastapi import HTTPException

# Load model
model = models.resnet18(pretrained=True)
model.eval()

# Image transform
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Download labels if not present
LABELS_FILE = "imagenet_classes.txt"
if not os.path.exists(LABELS_FILE):
    with open(LABELS_FILE, "w") as f:
        f.write(requests.get(
            "https://raw.githubusercontent.com/pytorch/hub/refs/heads/master/imagenet_classes.txt"
        ).text)

with open(LABELS_FILE, "r") as f:
    labels = f.read().strip().split("\n")

# Classification logic
async def classify_image_logic(file):
    try:
        image = Image.open(BytesIO(await file.read())).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")

    tensor = transform(image).unsqueeze(0)
    with torch.no_grad():
        outputs = model(tensor)
        probs = torch.nn.functional.softmax(outputs[0], dim=0)
        top_probs, top_idxs = torch.topk(probs, 2)

    return {
        "results": [{"label": labels[idx], "probability": float(top_probs[i])}
                    for i, idx in enumerate(top_idxs)]
    }
