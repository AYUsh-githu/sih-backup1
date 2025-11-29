import os
from supabase import create_client
import json

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

try:
    # Fetch latest journal entry
    response = supabase.table("journals").select("*").order("created_at", desc=True).limit(1).execute()
    
    if response.data:
        entry = response.data[0]
        print(f"\n--- Latest Journal Entry ({entry['created_at']}) ---")
        print(f"Content Preview: {entry['content'][:50]}...")
        
        print("\n--- AI Analysis (Tokenized Info) ---")
        ai_analysis = entry.get('ai_analysis')
        if ai_analysis:
            print(json.dumps(ai_analysis, indent=2))
        else:
            print("No AI analysis found for this entry.")
    else:
        print("No journal entries found.")

except Exception as e:
    print(f"Error fetching data: {e}")
