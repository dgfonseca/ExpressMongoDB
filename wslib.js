const WebSocket = require("ws");
var [postChat] = require("./controler/chat");

const clients = [];
const messages = [];

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", async function (ws) {
    clients.push(ws);
    sendMessages();

    ws.on("message", async function (msg) {
      console.log("ENTROOOOO");
      var x = await postChat({
        message: msg,
        author: "unknown",
        ts: Math.floor(Math.random() * 100) + 1,
      });
      messages.push(msg);
      sendMessages();
    });
  });

  const sendMessages = () => {
    clients.forEach((client) => client.send(JSON.stringify(messages)));
  };
};

exports.wsConnection = wsConnection;
