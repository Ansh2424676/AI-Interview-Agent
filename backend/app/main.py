from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.ai_interviewer import generate_ai_question
from app.scoring import score_answer
from app.models import InterviewRequest
from app.loader import load_curriculum, load_candidates
from app.memory import (
    create_session,
    get_session,
    add_answer,
    complete_session
)
from app.interview import get_question
from app.feedback import generate_feedback

app = FastAPI(
    title="AI Interview Agent",
    version="1.0.0",
    description="ABTalks AI Interview Agent"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MAX_QUESTIONS = 8


@app.get("/")
def root():
    return {
        "status": "running",
        "project": "AI Interview Agent"
    }


@app.get("/test")
def test():
    curriculum = load_curriculum()
    candidates = load_candidates()

    return {
        "curriculum_days": len(curriculum["days"]),
        "candidate_count": len(candidates["candidates"]),
        "status": "success"
    }


@app.post("/api/interview")
def interview(req: InterviewRequest):

    # ---------------- START INTERVIEW ----------------

    if req.candidate:

        create_session(req.sessionId, req.candidate)

        first_question = get_question(0)

        return {
            "reply": first_question,
            "done": False
        }

    # ---------------- CONTINUE INTERVIEW ----------------

    session = get_session(req.sessionId)

    if session is None:
        return {
            "reply": "Invalid Session",
            "done": True
        }

    score = score_answer(req.message)

    add_answer(
        req.sessionId,
        req.message,
        score
    )

    session = get_session(req.sessionId)

    question_index = session["current_question"]

    print(f"Current Question: {question_index}")

    # ---------------- END INTERVIEW ----------------

    if question_index >= MAX_QUESTIONS:

        complete_session(req.sessionId)

        feedback = generate_feedback(session)

        return {
            "reply": "Interview Completed",
            "done": True,
            "feedback": feedback
        }

    # ---------------- NEXT AI QUESTION ----------------

    next_question = generate_ai_question(session)

    return {
        "reply": next_question,
        "done": False
    }