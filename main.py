from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from scripts.langgraph_utils import generate_caption_logic
from scripts.resnet_utils import classify_image_logic
from scripts.yolo_utils import yolo_classify_logic

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate-caption/")
async def generate_caption(file: UploadFile = File(...)):
    return await generate_caption_logic(file)

@app.post("/classify/")
async def classify(file: UploadFile = File(...)):
    return await classify_image_logic(file)

@app.post("/yolo-classify/")
async def yolo_classify(file: UploadFile = File(...)):
    return await yolo_classify_logic(file)
