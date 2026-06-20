from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from openai import OpenAIError, RateLimitError, AuthenticationError

from auth_utils import get_current_user
from llm import evaluate_resume
from pdf_utils import extract_text_from_pdf
from schemas import EvaluateResponse

router = APIRouter()


@router.post("/", response_model=EvaluateResponse)
async def evaluate(
    job_description: str = Form(...),
    prompt: str = Form(default=""),
    resume: UploadFile = File(...),
    current_user: str = Depends(get_current_user),
):
    if resume.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail=f"Only PDF files are supported. Got: {resume.content_type}",
        )

    file_bytes = await resume.read()
    resume_text = extract_text_from_pdf(file_bytes)

    if not resume_text.strip():
        raise HTTPException(
            status_code=422,
            detail=(
                "No extractable text found in this PDF. "
                "Scanned or image-based PDFs are not supported — "
                "please upload a text-based PDF."
            ),
        )

    try:
        result = evaluate_resume(job_description, prompt, resume_text)
    except AuthenticationError:
        raise HTTPException(status_code=502, detail="OpenAI authentication failed — check OPENAI_API_KEY in .env")
    except RateLimitError:
        raise HTTPException(status_code=429, detail="OpenAI quota exceeded — add billing credits at platform.openai.com")
    except OpenAIError as e:
        raise HTTPException(status_code=502, detail=f"OpenAI error: {str(e)}")

    return EvaluateResponse(result=result)
