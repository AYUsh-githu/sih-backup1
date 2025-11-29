import requests
import json

url = "http://127.0.0.1:5000/analyze"
content = "I really enjoyed the yoga session today. I hated the loud noise. I am worried about exams. HELP!"

payload = {"content": content}

try:
    response = requests.post(url, json=payload)
    response.raise_for_status()
    data = response.json()
    print("Keys found:", list(data.keys()))
    print("Likes:", data.get("likes"))
    print("Dislikes:", data.get("dislikes"))
    print("Important Terms:", data.get("important_terms"))
    print("Panic Words:", data.get("panic_words"))
except Exception as e:
    print(f"Error: {e}")
