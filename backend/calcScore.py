from flask import Flask
from openai import OpenAI
from typing import List
import numpy as np
import os

os.environ.get("OPENAI_API_KEY")
app = Flask(__name__)
client = OpenAI()


def cosine_similarity(vector1: list, vector2: list):
    vector1 = np.array(vector1)
    vector2 = np.array(vector2)


# answerを受け取り、埋め込みベクトルをリスト形式で返す関数
def emb_answer(answer: str) -> List[float]:
    response = client.embeddings.create(
        input=[answer],
        model="text-embedding-3-small",
    )
    emb_vector = response['data'][0]['embedding']
    return emb_vector


def calc_score(user_answers: List[str], correct_answer: str):
    user_answers = [emb_answer(ans.replace("\n", " ")) for ans in user_answers]
    correct_answer = emb_answer(correct_answer.replace("\n", " "))


