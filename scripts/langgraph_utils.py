from typing import TypedDict
from langgraph.graph import StateGraph
from langchain_google_genai import ChatGoogleGenerativeAI
import base64
from fastapi import UploadFile
from dotenv import load_dotenv

load_dotenv(".env")

class GraphState(TypedDict):
    image_base64: str
    description: str
    funny_message: str

def image_reader_node(state: GraphState) -> dict:
    model = ChatGoogleGenerativeAI(model="models/gemini-2.0-flash-exp-image-generation", temperature=0.2)
    message = {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": "What is the main object in this image? Respond with just a noun like 'cat' or 'bus'.",
            },
            {
                "type": "image_url",
                "image_url": {"url": f"data:image/jpeg;base64,{state['image_base64']}"},
            },
        ],
    }
    
    response = model.invoke([message])
    return {"description": response.content.strip()}

def caption_maker_node(state: GraphState) -> dict:
    model = ChatGoogleGenerativeAI(model="models/gemini-1.5-pro-latest", temperature=0.8)
    prompt = f"Create a short caption involving a {state['description']}. Only return the caption."
    response = model.invoke(prompt)
    return {"funny_message": response.content.strip()}

def build_graph():
    graph = StateGraph(GraphState)

    graph.add_node("describe_image", image_reader_node)
    graph.add_node("make_joke", caption_maker_node)

    graph.set_entry_point("describe_image")
    graph.add_edge("describe_image", "make_joke")
    graph.set_finish_point("make_joke")

    return graph.compile()  # RETURNS A COMPILED APP

lang_graph = build_graph()


async def generate_caption_logic(file: UploadFile):
    try:
        image_data = await file.read()  # Ensure you're reading the file correctly
        image_base64 = base64.b64encode(image_data).decode("utf-8")

        result = lang_graph.invoke({"image_base64": image_base64})

        return {
            "description": result["description"],
            "caption": result["funny_message"]
        }
    except Exception as e:
        return {"error": str(e)}


