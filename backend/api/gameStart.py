import logging
from flask import Flask, jsonify
import numpy as np
import openai
import os
from backend.errors.generateImgException import GenerateImgException
from backend.errors.imgPromptException import ImagePromptException

openai.api_key = os.environ.get("OPENAI_API_KEY")
app = Flask(__name__)
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
    except openai.OpenAIError:
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
    except openai.OpenAIError:
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
