from fastapi import FastAPI, Request
from starlette.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from functions import process_docx_nda

import os

import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# API-маршрут для обработки файла с кастомными значениями
@app.post("/process_docx_nda/")
async def process_docx_api(request: Request):
    custom_values = await request.json()
    processed_file = process_docx_nda.process_docx(custom_values)
    return FileResponse(processed_file)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
