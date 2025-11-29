import requests
import json
import os
from supabase import create_client

# Load env vars to get a valid user ID if needed, or we can try to fetch one
SUPABASE_URL = os.environ.get("VITE_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("VITE_SUPABASE_PUBLISHABLE_KEY")

# Try to read .env if vars are missing
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
    # We might still be able to hit the local flask endpoint if it doesn't check auth strictly or if we pass a fake ID that exists in the DB
    # But app.py uses supabase client which needs credentials.
    pass

# Initialize Supabase to get a valid user and assessment ID
try:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    # Get a user
    # We need a real user ID because of foreign key constraints usually
    # But wait, app.py checks auth.uid() in RLS? 
    # The app.py submit_assessment endpoint takes user_id in the body.
    # It inserts into user_assessments.
    
    # Let's try to get a user. If we can't, we might have to make one or use a placeholder if the DB allows.
    # Actually, we can just pick the first user from profiles if we have access.
    # But RLS might block reading profiles.
    
    # Let's try to get an assessment ID first.
    assessments = supabase.table("assessments").select("id").limit(1).execute()
    if not assessments.data:
        print("No assessments found in DB.")
        exit(1)
    
    assessment_id = assessments.data[0]['id']
    print(f"Using Assessment ID: {assessment_id}")
    
    # We need a user_id. Let's assume the user is logged in on frontend.
    # For this test, I'll try to find a user ID from the journals table or just use a random UUID if I can't find one.
    # Or I can try to sign up a dummy user? No that's too complex.
    # Let's try to fetch a user ID from journals since I know that table exists and has data (maybe).
    
    user_id = "00000000-0000-0000-0000-000000000000" # Fallback
    try:
        users = supabase.table("profiles").select("id").limit(1).execute()
        if users.data:
            user_id = users.data[0]['id']
            print(f"Using User ID: {user_id}")
    except Exception as e:
        print(f"Could not fetch user: {e}")

    url = "http://127.0.0.1:5000/api/assessments/submit"
    
    payload = {
        "user_id": user_id,
        "assessment_id": assessment_id,
        "responses": [
            {"question_id": "q1", "value": 1, "text": "Several days"},
            {"question_id": "q2", "value": 2, "text": "More than half the days"}
        ]
    }
    
    print("Sending payload:", json.dumps(payload, indent=2))
    
    response = requests.post(url, json=payload)
    
    print("Status Code:", response.status_code)
    try:
        print("Response:", json.dumps(response.json(), indent=2))
    except:
        print("Response Text:", response.text)

except Exception as e:
    print(f"Setup failed: {e}")
