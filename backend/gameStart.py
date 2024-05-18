from flask import Flask
import numpy as np
import openai
import os

openai.api_key = os.environ.get('OPENAI_API_KEY')
app = Flask(__name__)


# GPT-3.5によって絵のお題のpromptを生成する関数
def generate_prompt():
    client = openai.OpenAI()
    response = client.completions.create(
        model = "gpt-3.5-turbo-0125",
        prompt="""
            変な絵を出力するために以下の条件を満たす日本語のpromptを作成してください。
            #dalle3のAPIに直接渡されるため、prompt以外の情報は含めない
            #promptは一つ
            #短く、推測されにくい内容かつ日本語
            #""で囲む"
            """
    )
    print(response["choices"][0]["text"])
    img_prompt = response["choices"][0]["text"]
    return img_prompt


# プロンプトから画像を生成してURLを返す関数
def generate_img_from_prompt(img_prompt):
    client = openai.OpenAI()
    response = client.images.generate(
        model="dall-e-3",
        prompt=img_prompt,
        size="1024x1792",
        quality="standard",
        n=1,
    )
    return response.data[0].url


# 画像生成、URLの出力を行うエンドポイント
@app.route("/gameStart")
def game_start():
    img_prompt = generate_prompt()
    url = generate_img_from_prompt(img_prompt)
    print(url)
    return url


if __name__ == '__main__':
    app.run(debug=True)