import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

# Client is created at module level per spec.
# If the key is missing/empty, the server still starts — calls to
# evaluate_resume() will raise an AuthenticationError from OpenAI,
# surfaced as a 500 until a valid key is added to .env.
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY") or "key-not-set")

SYSTEM_PROMPT = (
    "You are an expert HR assistant. When given a job description and a resume, "
    "evaluate how well the candidate matches the requirements. Structure your response as: "
    "(1) Match Score (0-10), (2) Key Strengths, (3) Gaps, (4) Overall Recommendation."
)


def evaluate_resume(job_description: str, prompt: str, resume_text: str) -> str:
    user_message = (
        f"Job Description:\n{job_description}\n\n"
        f"Resume:\n{resume_text}"
    )
    if prompt:
        user_message += f"\n\nAdditional Instructions: {prompt}"

    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ],
        max_tokens=600,
    )
    return response.choices[0].message.content
