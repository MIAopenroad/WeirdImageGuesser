from flask import Flask, request, jsonify
from openai import OpenAI
from typing import List
import openai
import numpy as np
import os

os.environ.get("OPENAI_API_KEY")
app = Flask(__name__)
client = OpenAI()


def cosine_similarity(vector1: list, vector2: list):
    vector1 = np.array(vector1)
    vector2 = np.array(vector2)
    cod_sim = np.dot(vector1, vector2) / (np.linalg.norm(vector1) * np.linalg.norm(vector2))
    return cod_sim


# answerを受け取り、埋め込みベクトルをリスト形式で返す関数
def embedding_answer(answer: str):
    try:
        response = client.embeddings.create(
            input=[answer],
            model="text-embedding-3-small",
        )
        emb_vector = response.data[0].embedding
        return emb_vector
    except openai.OpenAIError as e:
        print(f"Error: {e}")
        return None


# answerのリストを受け取り、ベクトルに埋め込んで正解との類似度を測りスコアに直して返す関数
@app.route("/calcScore", methods=["GET"])
def calc_score():
    answers = request.args["answers"]
    correct_answer = request.args["correct"]
    embed_correct = embedding_answer(correct_answer)
    print(f"embed_correct={embed_correct}")
    score_list = []
    for ans in answers:
        embed_answer = embedding_answer(ans)
        print(f"embed_correct={embed_answer}")
        score_list.append(cosine_similarity(embed_correct, embed_answer) * 100)  # [0, 1]->[0, 100]
    response = jsonify(score_list)
    return response


@app.route("/calcTest", methods=["GET"])
def calc_test():
    score = [0.5, 0.2, 0.4, 0.9]
    response = jsonify(score)
    return response


# cos_sim test
if __name__ == '__main__':
    pass
    # a = [0.1, 0.5, 1]
    # b = [0.5, 0.8, 0.1]
    # print(cosine_similarity(a, b))
    # print(cosine_similarity(b, a))
    #
    # correct_ans = "正解"
    # user_answers = ["ユーザー1", "ユーザー2", "正解"]
    # print(calc_score(user_answers, correct_ans))

