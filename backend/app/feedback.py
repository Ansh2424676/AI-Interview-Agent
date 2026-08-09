import ollama
import json

def generate_feedback(session):

    prompt = f"""
You are an expert technical interviewer.

Candidate Answers:
{session['answers']}

Scores:
{session['scores']}

Generate JSON only in this format:

{{
  "overall_score": 8.5,
  "performance": "Good",
  "recommendation": "Hire",
  "strengths": [
    "...",
    "..."
  ],
  "gaps": [
    "...",
    "..."
  ],
  "next_steps": [
    "...",
    "...",
    "..."
  ]
}}

Return ONLY valid JSON.
"""

    response = ollama.chat(
        model="llama3.2:3b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    try:
        return json.loads(response["message"]["content"])
    except Exception:
        return {
            "overall_score": 0,
            "performance": "Unable to Generate",
            "recommendation": "Retry",
            "strengths": [],
            "gaps": [],
            "next_steps": []
        }