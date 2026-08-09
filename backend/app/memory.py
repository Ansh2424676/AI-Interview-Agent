SESSIONS = {}


def create_session(session_id, candidate):

    SESSIONS[session_id] = {

        "candidate": candidate,

        "current_question": 0,

        "answers": [],

        "scores": [],

        "completed": False

    }


def get_session(session_id):

    return SESSIONS.get(session_id)


def add_answer(session_id, answer, score):

    session = SESSIONS[session_id]

    session["answers"].append(answer)

    session["scores"].append(score)

    session["current_question"] += 1


def complete_session(session_id):

    SESSIONS[session_id]["completed"] = True