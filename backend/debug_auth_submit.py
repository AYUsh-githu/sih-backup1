import requests
import json
import os
import random
import string
from supabase import create_client

# Load env vars
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
                        value = value.strip().strip('"').strip("'")
                        if key == "VITE_SUPABASE_URL":
                            SUPABASE_URL = value
                        elif key == "VITE_SUPABASE_PUBLISHABLE_KEY":
                            SUPABASE_KEY = value
    except Exception as e:
        print(f"Error reading .env: {e}")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: Could not find Supabase credentials.")
    exit(1)

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def generate_random_email():
    return ''.join(random.choices(string.ascii_lowercase, k=10)) + "@example.com"

def generate_random_password():
    return "TestPass123!"

try:
    # 1. Sign up a new user to get a token
    email = generate_random_email()
    password = generate_random_password()
    print(f"Creating test user: {email}")
    
    auth_response = supabase.auth.sign_up({
        "email": email,
        "password": password
    })
    
    if not auth_response.user:
        print("Failed to create user.")
        # Try signing in if user exists (unlikely for random)
        exit(1)
        
    user_id = auth_response.user.id
    token = auth_response.session.access_token
    print(f"User created. ID: {user_id}")
    print(f"Token obtained (len={len(token)})")

    # 2. Get an assessment ID and Questions
    assessments = supabase.table("assessments").select("id").limit(1).execute()
    if not assessments.data:
        print("No assessments found in DB.")
        exit(1)
    
    assessment_id = assessments.data[0]['id']
    print(f"Using Assessment ID: {assessment_id}")

    questions = supabase.table("assessment_questions").select("id").eq("assessment_id", assessment_id).limit(2).execute()
    if not questions.data:
        print("No questions found for assessment.")
        # Fallback to random UUIDs if no questions exist, just to test the insert
        import uuid
        q1_id = str(uuid.uuid4())
        q2_id = str(uuid.uuid4())
    else:
        q1_id = questions.data[0]['id']
        q2_id = questions.data[1]['id'] if len(questions.data) > 1 else str(uuid.uuid4())

    # 3. Submit assessment via Backend API
    url = "http://127.0.0.1:5000/api/assessments/submit"
    
    payload = {
        "user_id": user_id,
        "assessment_id": assessment_id,
        "responses": [
            {"question_id": q1_id, "value": 1, "text": "Several days"},
            {"question_id": q2_id, "value": 2, "text": "More than half the days"}
        ]
    }
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    print("Sending authenticated request...")
    response = requests.post(url, json=payload, headers=headers)
    
    print("Status Code:", response.status_code)
    try:
        print("Response:", json.dumps(response.json(), indent=2))
    except:
        print("Response Text:", response.text)

except Exception as e:
    print(f"Test failed: {e}")
