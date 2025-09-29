# backend/app.py
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os

# Serve frontend folder
app = Flask(
    __name__,
    static_folder=os.path.join(os.path.dirname(__file__), "..", "campus-well-link", "dist"),
    static_url_path="/"
)
CORS(app)  # only for dev

# backend/app.py
OLLAMA_CHAT_URL = "http://127.0.0.1:11434/api/chat"  # correct endpoint

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json() or {}
    user_message = data.get("message", "")
    model_name = data.get("model", "llama3")  # replace with your model

    payload = {
        "model": model_name,
        "messages": [
            {"role": "user", "content": user_message}
        ],
        "stream": False
    }

    try:
        r = requests.post(OLLAMA_CHAT_URL, json=payload, timeout=60)
        r.raise_for_status()  # raise error if not 2xx
    except Exception as e:
        return jsonify({"reply": f"Error: cannot reach Ollama API ({e})"}), 500

    resp = r.json()
    
    # Extract only the content from Ollama's response
    reply = resp.get("message", {}).get("content", "")

    return jsonify({"reply": reply})

# Serve frontend index.html
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
