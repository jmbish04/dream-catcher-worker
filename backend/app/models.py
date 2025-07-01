from pydantic import BaseModel

class GenerationRequest(BaseModel):
    image_key: str
    mask: bytes
    prompt: str
    revision: int = 1

class GenerationResponse(BaseModel):
    status: str
    url: str
