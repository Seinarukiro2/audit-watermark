from fastapi import FastAPI, Request
from starlette.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from server.functions import nda_pdf_worker

import os

import json

app = FastAPI()
origins = [
    "http://0.0.0.0:3001",
    "http://0.0.0.0:3000",
    "http://localhost:3001",
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/process_docx_nda/")
async def process_docx_api(request: Request):
    custom_values = await request.json()
    processed_file = nda_pdf_worker.edit_pdf(custom_values)
    return FileResponse(processed_file)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8003)
