import os
from ollama import Client
from app.candidate import build_candidate_profile


client = Client(
    host="https://ollama.com",
    headers={
        "Authorization": f"Bearer {os.environ.get('OLLAMA_API_KEY')}"
    }
)


def generate_ai_question(session):

    profile = build_candidate_profile(session["candidate"])

    previous_answers = "\n".join(session["answers"])

    prompt = f"""
You are an expert technical interviewer.

Candidate Profile:
{profile}

Previous Answers:
{previous_answers}

Ask ONE interview question only.

Do not explain.

Do not number it.

Question:
"""

    response = client.chat(
        model="llama3.2:3b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]