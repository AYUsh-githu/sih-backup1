# backend/app.py
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os
import json
from supabase import create_client, Client, ClientOptions

# Serve frontend folder
app = Flask(
    __name__,
    static_folder=os.path.join(os.path.dirname(__file__), "..", "campus-well-link", "dist"),
    static_url_path="/"
)
CORS(app)  # only for dev

# Initialize Supabase Client
SUPABASE_URL = os.environ.get("VITE_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("VITE_SUPABASE_PUBLISHABLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    try:
        env_path = os.path.join(os.path.dirname(__file__), "..", "campus-well-link", ".env")
        if os.path.exists(env_path):
            with open(env_path, "r") as f:
                for line in f:
                    line = line.strip()
                    if not line or line.startswith("#"):
                        continue
                    if "=" in line:
                        key, value = line.split("=", 1)
                        # Strip quotes if present
                        value = value.strip().strip('"').strip("'")
                        if key == "VITE_SUPABASE_URL":
                            SUPABASE_URL = value
                        elif key == "VITE_SUPABASE_PUBLISHABLE_KEY":
                            SUPABASE_KEY = value
    except Exception as e:
        print(f"Error reading .env: {e}")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None

OLLAMA_CHAT_URL = "http://127.0.0.1:11434/api/chat"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json() or {}
    user_message = data.get("message", "")
    model_name = data.get("model", "llama3")

    payload = {
        "model": model_name,
        "messages": [
            {"role": "user", "content": user_message}
        ],
        "stream": False
    }

    try:
        r = requests.post(OLLAMA_CHAT_URL, json=payload, timeout=60)
        r.raise_for_status()
    except Exception as e:
        return jsonify({"reply": f"Error: cannot reach Ollama API ({e})"}), 500

    resp = r.json()
    reply = resp.get("message", {}).get("content", "")

    return jsonify({"reply": reply})

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json() or {}
    content = data.get("content", "")
    
    system_prompt = (
        "Analyze this text. Return a JSON object with keys: "
        "'mood', 'risk_level' (Low/Medium/High), 'summary', 'routine', "
        "'likes' (list of strings), 'dislikes' (list of strings), "
        "'important_terms' (list of strings), and 'panic_words' (list of strings)."
    )

    payload = {
        "model": "llama3",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": content}
        ],
        "stream": False,
        "format": "json"
    }

    try:
        r = requests.post(OLLAMA_CHAT_URL, json=payload, timeout=60)
        r.raise_for_status()
    except Exception as e:
        return jsonify({"error": f"Error: cannot reach Ollama API ({e})"}), 500

    resp = r.json()
    reply_content = resp.get("message", {}).get("content", "{}")
    
    try:
        analysis_result = json.loads(reply_content)
        print("\n--- AI Analysis Result ---")
        print(json.dumps(analysis_result, indent=2))
        print("--------------------------\n")
        return jsonify(analysis_result)
    except Exception:
        return jsonify({"error": "Failed to parse AI response"}), 500

@app.route("/generate_plan", methods=["POST"])
def generate_plan():
    data = request.get_json() or {}
    mood = data.get("mood", "Neutral")
    journal_summary = data.get("journal_summary", "No recent journal entry.")

    system_prompt = (
        f"You are a wellness coach. Create a daily wellness plan for a student based on their mood: {mood} "
        f"and journal: {journal_summary}. Return a JSON object with a key 'tasks' containing a list of 4 tasks. "
        "Each task must have: 'category' (Sleep, Nutrition, Movement, or Mindfulness), 'title', and 'description'."
    )

    payload = {
        "model": "llama3",
        "messages": [
            {"role": "system", "content": system_prompt}
        ],
        "stream": False,
        "format": "json"
    }

    try:
        r = requests.post(OLLAMA_CHAT_URL, json=payload, timeout=60)
        r.raise_for_status()
    except Exception as e:
        print(f"Ollama not reachable, returning mock data: {e}")
        return jsonify({
            "tasks": [
                {
                    "category": "Sleep",
                    "title": "Digital Sunset",
                    "description": "Turn off all screens 1 hour before bed to improve melatonin production."
                },
                {
                    "category": "Nutrition",
                    "title": "Hydration Boost",
                    "description": "Drink a glass of water immediately after waking up."
                },
                {
                    "category": "Movement",
                    "title": "10-Minute Walk",
                    "description": "Take a brisk walk outside to get some fresh air and sunlight."
                },
                {
                    "category": "Mindfulness",
                    "title": "5-Minute Breathing",
                    "description": "Practice box breathing (4-4-4-4) for 5 minutes to reduce stress."
                }
            ]
        })

    resp = r.json()
    reply_content = resp.get("message", {}).get("content", "{}")

    try:
        plan_result = json.loads(reply_content)
        return jsonify(plan_result)
    except Exception:
        return jsonify({"error": "Failed to parse AI response"}), 500

# --- Assessment Endpoints ---

@app.route("/api/assessments", methods=["GET"])
def get_assessments():
    if not supabase:
        return jsonify({"error": "Supabase not configured"}), 500
    try:
        response = supabase.table("assessments").select("*").execute()
        return jsonify(response.data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/assessments/<assessment_id>", methods=["GET"])
def get_assessment_details(assessment_id):
    if not supabase:
        return jsonify({"error": "Supabase not configured"}), 500
    try:
        assessment = supabase.table("assessments").select("*").eq("id", assessment_id).single().execute()
        questions = supabase.table("assessment_questions").select("*").eq("assessment_id", assessment_id).order("question_order").execute()
        
        return jsonify({
            "assessment": assessment.data,
            "questions": questions.data
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/assessments/submit", methods=["POST"])
def submit_assessment():
    if not supabase:
        return jsonify({"error": "Supabase not configured"}), 500
    
    data = request.get_json()
    user_id = data.get("user_id")
    assessment_id = data.get("assessment_id")
    responses = data.get("responses")
    auth_header = request.headers.get("Authorization")

    if not user_id or not assessment_id or not responses:
        return jsonify({"error": "Missing required fields"}), 400

    # Create authenticated client if token is present
    client = supabase
    if auth_header:
        token = auth_header.replace("Bearer ", "")
        client = create_client(SUPABASE_URL, SUPABASE_KEY, options=ClientOptions(headers={'Authorization': f'Bearer {token}'}))

    try:
        total_score = sum(r.get("value", 0) for r in responses)
        
        assessment_info = client.table("assessments").select("code").eq("id", assessment_id).single().execute()
        code = assessment_info.data.get("code")
        
        risk_level = "Low"
        if code == "PHQ-9":
            if total_score >= 20: risk_level = "Severe"
            elif total_score >= 15: risk_level = "Moderately Severe"
            elif total_score >= 10: risk_level = "Moderate"
            elif total_score >= 5: risk_level = "Mild"
        elif code == "GAD-7":
            if total_score >= 15: risk_level = "Severe"
            elif total_score >= 10: risk_level = "Moderate"
            elif total_score >= 5: risk_level = "Mild"
        elif code == "C-SSRS":
             if total_score > 0: risk_level = "High"
        
        ai_prompt = (
            f"Analyze these assessment results for {code}. Total Score: {total_score}. Risk Level: {risk_level}. "
            f"Responses: {json.dumps(responses)}. "
            "Return a JSON object with keys: 'summary' (string) and 'recommendations' (list of strings)."
        )
        
        ai_payload = {
            "model": "llama3",
            "messages": [{"role": "user", "content": ai_prompt}],
            "stream": False,
            "format": "json"
        }
        
        ai_analysis = {}
        try:
            r = requests.post(OLLAMA_CHAT_URL, json=ai_payload, timeout=30)
            if r.status_code == 200:
                ai_resp = r.json()
                content = ai_resp.get("message", {}).get("content", "{}")
                try:
                    ai_analysis = json.loads(content)
                except:
                    ai_analysis = {"summary": content}
        except Exception as e:
            print(f"AI Analysis failed: {e}")
            ai_analysis = {"error": "AI analysis unavailable"}

        user_assessment = client.table("user_assessments").insert({
            "user_id": user_id,
            "assessment_id": assessment_id,
            "total_score": total_score,
            "risk_level": risk_level,
            "ai_analysis": ai_analysis
        }).execute()
        
        user_assessment_id = user_assessment.data[0]["id"]
        
        formatted_responses = []
        for r in responses:
            formatted_responses.append({
                "user_assessment_id": user_assessment_id,
                "question_id": r["question_id"],
                "response_value": r.get("value"),
                "response_text": r.get("text")
            })
            
        client.table("user_assessment_responses").insert(formatted_responses).execute()

        # Log activity
        try:
            client.table("user_activities").insert({
                "user_id": user_id,
                "activity_type": "assessment",
                "title": f"Completed {code} Assessment",
                "details": {"score": total_score, "risk_level": risk_level}
            }).execute()
        except Exception as log_error:
            print(f"Failed to log activity: {log_error}")
        
        return jsonify({
            "success": True,
            "result": user_assessment.data[0]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/student/results", methods=["GET"])
def get_student_results():
    if not supabase:
        return jsonify({"error": "Supabase not configured"}), 500
    
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "User ID required"}), 400

    auth_header = request.headers.get("Authorization")
    client = supabase
    if auth_header:
        token = auth_header.replace("Bearer ", "")
        client = create_client(SUPABASE_URL, SUPABASE_KEY, options=ClientOptions(headers={'Authorization': f'Bearer {token}'}))
        
    try:
        results = client.table("user_assessments").select("*, assessments(name, code)").eq("user_id", user_id).order("completed_at", desc=True).execute()
        return jsonify(results.data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/activities/log", methods=["POST"])
def log_activity():
    if not supabase:
        return jsonify({"error": "Supabase not configured"}), 500
    
    data = request.get_json()
    user_id = data.get("user_id")
    activity_type = data.get("activity_type")
    title = data.get("title")
    details = data.get("details", {})
    
    auth_header = request.headers.get("Authorization")
    client = supabase
    if auth_header:
        token = auth_header.replace("Bearer ", "")
        client = create_client(SUPABASE_URL, SUPABASE_KEY, options=ClientOptions(headers={'Authorization': f'Bearer {token}'}))

    try:
        client.table("user_activities").insert({
            "user_id": user_id,
            "activity_type": activity_type,
            "title": title,
            "details": details
        }).execute()
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/student/recent-activity", methods=["GET"])
def get_recent_activity():
    if not supabase:
        return jsonify({"error": "Supabase not configured"}), 500
    
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "User ID required"}), 400

    auth_header = request.headers.get("Authorization")
    client = supabase
    if auth_header:
        token = auth_header.replace("Bearer ", "")
        client = create_client(SUPABASE_URL, SUPABASE_KEY, options=ClientOptions(headers={'Authorization': f'Bearer {token}'}))
        
    try:
        # Fetch last 5 activities
        activities = client.table("user_activities").select("*").eq("user_id", user_id).order("created_at", desc=True).limit(5).execute()
        return jsonify(activities.data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
