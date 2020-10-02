const WebSocket = require("ws");
var [
  getChats,
  getChatByTs,
  postChat,
  putChat,
  delChat,
] = require("./controler/chat");

const clients = [];
const messages = [];

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", function (ws) {
    clients.push(ws);
    sendMessages();

    ws.on("message", async function (msg) {
      var chats = {
        message: msg,
        author: "Unknown author",
        ts: Math.floor(Math.random() * 6) + 1 + "",
      };
      const c = await postChat(chats);
      messages.push(msg);
      sendMessages();
    });
  });

  const sendMessages = () => {
    clients.forEach((client) => client.send(JSON.stringify(messages)));
  };
};

exports.wsConnection = wsConnection;
