QUESTIONS = [

    "Tell me about yourself.",

    "Explain Prompt Engineering.",

    "What is Retrieval-Augmented Generation (RAG)?",

    "How does ChromaDB work?",

    "Explain Vector Embeddings.",

    "Difference between Fine-Tuning and RAG?",

    "What are AI Agents?",

    "Why do you want this role?"

]


def get_question(index):

    if index >= len(QUESTIONS):

        return None

    return QUESTIONS[index]