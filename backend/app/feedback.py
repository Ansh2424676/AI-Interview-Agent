import json
import os
from ollama import Client


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


def generate_feedback(session):

    prompt = f"""
You are an expert technical interviewer.

Candidate Answers:
{session['answers']}

Scores:
{session['scores']}

Generate a professional interview evaluation.

Return ONLY valid JSON in exactly this format:

{{
    "overall_score": 8.5,
    "performance": "Good",
    "recommendation": "Hire",
    "strengths": [
        "Strong technical understanding",
        "Clear communication",
        "Good problem-solving ability"
    ],
    "gaps": [
        "Needs more practice with edge cases",
        "Can improve explanation of complexity",
        "Needs deeper knowledge of advanced topics"
    ],
    "next_steps": [
        "Practice advanced coding problems",
        "Review system design concepts",
        "Improve technical explanations"
    ]
}}

Rules:

- overall_score must be between 0 and 10.
- strengths must contain exactly 3 items.
- gaps must contain exactly 3 items.
- next_steps must contain exactly 3 items.
- Return ONLY valid JSON.
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

    content = response["message"]["content"].strip()

    try:
        return json.loads(content)

    except Exception as e:
        print("Feedback JSON Error:", e)
        print("Raw AI Response:", content)

        return {
            "overall_score": round(
                sum(session["scores"]) / len(session["scores"]),
                1
            ) if session["scores"] else 0,

            "performance": "Good",

            "recommendation": "Hire",

            "strengths": [
                "Good technical understanding",
                "Able to explain solutions clearly",
                "Demonstrates problem-solving ability"
            ],

            "gaps": [
                "Needs more practice with edge cases",
                "Can improve complexity explanations",
                "Should practice advanced technical topics"
            ],

            "next_steps": [
                "Practice coding problems regularly",
                "Review advanced data structures and algorithms",
                "Improve technical communication"
            ]
        }