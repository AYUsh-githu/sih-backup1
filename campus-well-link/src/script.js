// script.js

// Add a chat message to the chat box
function addMessage(text, sender, extraClass = "") {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.className = `message ${sender} ${extraClass}`.trim();
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight; // auto-scroll
}

// Send message to backend
async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  // Show user message
  addMessage(message, "user");
  input.value = "";

  // Show temporary "thinking..." message
  addMessage("...thinking", "bot", "temp");

  try {
    const response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    // Remove temporary message
    const tmp = document.querySelector(".message.bot.temp");
    if (tmp) tmp.remove();

    addMessage(data.reply || "No reply from bot", "bot");
  } catch (err) {
    const tmp = document.querySelector(".message.bot.temp");
    if (tmp) tmp.remove();
    addMessage("Error: could not reach backend", "bot");
    console.error(err);
  }
}

// Add "Enter" key support for input box
document.getElementById("user-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") sendMessage();
});

// Optional: attach to send button if you have one
document.getElementById("send-button")?.addEventListener("click", sendMessage);
