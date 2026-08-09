import os
from ollama import Client
from app.candidate import build_candidate_profile


def get_ollama_client():
    api_key = os.getenv("OLLAMA_API_KEY")

    if not api_key:
        raise RuntimeError("OLLAMA_API_KEY is not set on the server")

    return Client(
        host="https://ollama.com",
        headers={
            "Authorization": f"Bearer {api_key}"
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

Rules:
- Ask a technical interview question relevant to the candidate.
- Use previous answers to create intelligent follow-up questions.
- Gradually increase difficulty.
- Cover different technical topics when appropriate.
- Do not explain.
- Do not number it.
- Return only the question.

Question:
"""

    client = get_ollama_client()

    response = client.chat(
        model="gpt-oss:20b-cloud",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]


def get_question(index=0):

    questions = [
        "Tell me about yourself and briefly describe the most important AI or technical project you built during the cohort."
    ]

    if 0 <= index < len(questions):
        return questions[index]

    return questions[0]