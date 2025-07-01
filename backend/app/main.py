from fastapi import FastAPI
from . import api

app = FastAPI(title="Inpainting Service")
app.include_router(api.router)
