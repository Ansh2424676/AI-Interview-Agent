import os
import requests


OLLAMA_API_KEY = os.getenv("OLLAMA_API_KEY")

if not OLLAMA_API_KEY:
    raise RuntimeError("OLLAMA_API_KEY is not configured")


def generate_ai_question(session):
    current_question = session.get("current_question", 1)

    messages = [
        {
            "role": "system",
            "content": (
                "You are a professional technical interviewer. "
                "Conduct a realistic AI engineering interview. "
                "Ask one clear technical question at a time. "
                "Use the candidate's previous answers to create relevant "
                "follow-up questions."
            ),
        },
        {
            "role": "user",
            "content": f"""
This is question number {current_question}.

Candidate interview session:
{session}

Generate the next technical interview question.

Return ONLY the question text.
""",
        },
    ]

    response = requests.post(
        "https://ollama.com/api/chat",
        headers={
            "Authorization": f"Bearer {OLLAMA_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": "gpt-oss:20b",
            "messages": messages,
            "stream": False,
        },
        timeout=90,
    )

    if response.status_code != 200:
        raise RuntimeError(
            f"Ollama API Error {response.status_code}: {response.text}"
        )

    data = response.json()

    return data["message"]["content"].strip()