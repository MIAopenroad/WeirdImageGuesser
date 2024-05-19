from flask import Flask
from flask_cors import CORS


if __name__ == "__main__":
    app = Flask(__name__)
    CORS(app, resources={"/": {"origins": "http://localhost:5173"}})
    app.run(debug=True)
