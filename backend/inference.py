from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# Path to your LLaMA model
tokenizer = AutoTokenizer.from_pretrained("C:/Users/santo/OneDrive/Desktop/sih123/llama_model")
model = AutoModelForCausalLM.from_pretrained("C:/Users/santo/OneDrive/Desktop/sih123/llama_model", device_map="auto")

def generate_reply(prompt):
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    outputs = model.generate(**inputs, max_length=256)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)
