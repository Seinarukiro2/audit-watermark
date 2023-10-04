from fastapi import FastAPI, Request
from starlette.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from functions import process_docx_nda, docx_to_pdf

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
    if custom_values['convertToPDF']:
        return docx_to_pdf.convert_docx_to_pdf(processed_file)
    else:
        return FileResponse(processed_file)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
