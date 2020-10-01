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
      .insertOne(chat, function (err, result) {
        if (err) {
          console.log(err);
          res.send(err);
          return;
        }
      });
  });
}

async function putChat(id, chat) {
  return mdbconn.conn().then((client) => {
    return client
      .db("retochat")
      .collection("chat")
      .updateOne(
        {
          ts: id,
        },
        {
          $set: chat,
        },
        function (err, result) {
          if (err) {
            console.log(err);
            res.send(err);
            return;
          }
        }
      );
  });
}

async function delChat(id) {
  return mdbconn.conn().then((client) => {
    return client
      .db("retochat")
      .collection("chat")
      .deleteOne({ ts: id }, function (err, result) {
        if (err) {
          console.log(err);
          res.send(err);
          return;
        }
      });
  });
}
module.exports = [getChats, getChatByTs, postChat, putChat, delChat];
