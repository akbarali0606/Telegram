const socket = io();
const sendBtn = document.getElementById("send");
const messageInput = document.getElementById("message");
const chatBox = document.getElementById("chat-box");

// Xabar yuborish funksiyasi
function sendMessage() {
  const message = messageInput.value.trim();
  if (message !== "") {
    socket.emit("chat message", { id: socket.id, text: message });
    messageInput.value = "";
  }
}

// "Yuborish" tugmasini bosganda xabar yuborish
sendBtn.addEventListener("click", sendMessage);

// Enter tugmasi bosilganda xabar yuborish
messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Enter bosilganda yangi qatorga tushib ketmasligi uchun
    sendMessage();
  }
});

// Xabarni chat oynasiga chiqarish
socket.on("chat message", (msg) => {
  const messageElement = document.createElement("div");
  messageElement.textContent = msg.text;

  if (msg.id === socket.id) {
    messageElement.classList.add("my-message");
  } else {
    messageElement.classList.add("other-message");
  }

  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
});
