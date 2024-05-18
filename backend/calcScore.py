from flask import Flask
from openai import OpenAI
import numpy as np
import os

os.environ.get("OPENAI_API_KEY")
app = Flask(__name__)
client = OpenAI()


def calc_score_one(answer: str):


