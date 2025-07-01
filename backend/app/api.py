from fastapi import APIRouter, HTTPException
from .models import GenerationRequest, GenerationResponse
from .deps import get_dalle_client

router = APIRouter()

@router.post("/generate", response_model=GenerationResponse)
async def generate(req: GenerationRequest, dalle=Depends(get_dalle_client)):
    try:
        # TODO: call DALL·E API with req.image_key, req.mask and req.prompt
        # and save result to storage
        return GenerationResponse(status="ok", url=".../edited.jpg")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
