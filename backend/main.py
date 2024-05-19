import logging
import os
from os.path import dirname, join
from typing import Optional
from typing_extensions import List
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
import openai
from errors.embedException import EmbedException
from errors.generateImgException import GenerateImgException
from errors.imgPromptException import ImagePromptException
import numpy as np

app = Flask(__name__)
# CORS(app, resources={"r/*": {"origins": "*"}})
CORS(app)
dotenv_path = join(dirname(__file__), ".env")
load_dotenv(verbose=True, dotenv_path=dotenv_path)

openai.api_key = os.environ.get("OPENAI_API_KEY")
client = openai.OpenAI()
logging.basicConfig(level=logging.DEBUG, filename="calcScore.log", filemode="w")
logger = logging.getLogger()


# GPT-3.5によって絵のお題のpromptを生成する関数
def generate_prompt():
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {
                    "role": "system",
                    "content": "あなたはプロンプトを生成するアシスタントです。",
                },
                {
                    "role": "user",
                    "content": """
                                変な絵を出力するために以下の条件を満たす日本語のpromptを作成してください。
                                #dalle3のAPIに直接渡されるため、prompt以外の情報は含めない
                                #promptは一つ
                                #短く、推測されにくい内容かつ日本語
                                #""で囲む
                                """,
                },
            ],
        )
        img_prompt = response.choices[0].message.content
        return img_prompt

    except Exception:
        logger.warning(ImagePromptException())
        raise ImagePromptException()


# プロンプトから画像を生成してURLを返す関数
def generate_img_from_prompt(img_prompt: str):
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=img_prompt,
            size="1792x1024",
            quality="standard",
            n=1,
        )
        return response.data[0].url

    except Exception:
        logger.warning(GenerateImgException(img_prompt))
        raise GenerateImgException(img_prompt)


# 画像生成、URLの出力を行うエンドポイント
@app.route("/gameStart", methods=["GET"])
def game_start():
    try:
        img_prompt = generate_prompt()
        url = generate_img_from_prompt(img_prompt)
        return jsonify({"url": url, "prompt": img_prompt})
    except ImagePromptException as ie:
        return jsonify(ie)
    except GenerateImgException as ge:
        return jsonify(ge)
    except Exception as e:
        return jsonify(e)


def cosine_similarity(vector1: list, vector2: list):
    vector1 = np.array(vector1)
    vector2 = np.array(vector2)
    cod_sim = np.dot(vector1, vector2) / (
        np.linalg.norm(vector1) * np.linalg.norm(vector2)
    )
    return cod_sim


# answerを受け取り、埋め込みベクトルをリスト形式で返す関数
def embedding_answer(answer: str) -> Optional[List[float]]:
    try:
        response = client.embeddings.create(
            input=[answer],
            model="text-embedding-3-small",
        )
        emb_vector = response.data[0].embedding
        return emb_vector
    except Exception:
        logger.warning(EmbedException(answer))
        raise EmbedException(answer)


# answerのリストを受け取り、ベクトルに埋め込んで正解との類似度を測りスコアに直して返す関数
@app.route("/calcScore", methods=["POST"])
def calc_score():
    answers = request.args["answers"]
    correct_answer = request.args["correct"]
    embed_correct = embedding_answer(correct_answer)
    logger.info(f"embed_correct={embed_correct}")
    score_list = []
    try:
        for ans in answers:
            embed_answer = embedding_answer(ans)
            logger.info(f"embed_correct={embed_answer}")
            score_list.append(
                cosine_similarity(embed_correct, embed_answer) * 100
            )  # [0, 1]->[0, 100]
        response = jsonify(score_list)
        return response

    except EmbedException as e:
        return jsonify(e)
    except Exception as e:
        return jsonify(e)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
