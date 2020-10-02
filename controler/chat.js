const mdbconn = require("../lib/utils/mongo.js");

async function getChats() {
  return mdbconn.conn().then((client) => {
    return client.db("retochat").collection("chat").find({}).toArray();
  });
}

async function getChatByTs(msg) {
  return mdbconn.conn().then((client) => {
    return client.db("retochat").collection("chat").find({ ts: msg }).toArray();
  });
}

async function postChat(chat) {
  return mdbconn.conn().then((client) => {
    return client
      .db("retochat")
      .collection("chat")
      .insertOne(chat, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
      });
  });
}

async function putChat(id, chat) {
  return mdbconn.conn().then((client) => {
    return client.db("retochat").collection("chat").updateOne(
      {
        ts: id,
      },
      {
        $set: chat,
      }
    );
  });
}

async function delChat(id) {
  return mdbconn.conn().then((client) => {
    return client.db("retochat").collection("chat").deleteOne({ ts: id });
  });
}
module.exports = [getChats, getChatByTs, postChat, putChat, delChat];
