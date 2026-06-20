from io import BytesIO
from pypdf import PdfReader


def extract_text_from_pdf(file_content: bytes) -> str:
    try:
        reader = PdfReader(BytesIO(file_content))
        pages = [page.extract_text() or "" for page in reader.pages]
        return "\n".join(pages).strip()
    except Exception:
        return ""
