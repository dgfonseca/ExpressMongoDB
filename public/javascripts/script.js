const ws = new WebSocket("ws://localhost:3000");

ws.onmessage = (msg) => {
  renderMessages(JSON.parse(msg.data));
};

const renderMessages = (data) => {
  const html = data.map((item) => `<p>${item}</p>`).join(" ");
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const messages = document.getElementById("message");
  ws.send(messages.value);
  messages.value = "";
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);
