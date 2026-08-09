def score_answer(answer):

    answer = answer.lower()

    score = 0

    # Length Score (4 Marks)
    words = len(answer.split())

    if words >= 30:
        score += 4
    elif words >= 15:
        score += 3
    elif words >= 8:
        score += 2
    else:
        score += 1

    # Technical Keywords (4 Marks)
    keywords = [
        "python",
        "api",
        "fastapi",
        "rag",
        "vector",
        "embedding",
        "database",
        "chromadb",
        "ai",
        "agent"
    ]

    matches = sum(1 for k in keywords if k in answer)

    if matches >= 4:
        score += 4
    elif matches >= 2:
        score += 3
    elif matches >= 1:
        score += 2

    # Communication (2 Marks)
    if "." in answer or "," in answer:
        score += 2
    else:
        score += 1

    return min(score, 10)