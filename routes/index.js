var express = require("express");
var router = express.Router();

/* GET home page. */
var [
  getChats,
  getChatByTs,
  postChat,
  putChat,
  delChat,
] = require("../controler/chat");

/* GET users listing. */
router.get("/chat/api/messages", async function (req, res, next) {
  const chat = await getChats();
  res.send(chat);
});

router.get("/chat/api/messages/:id", async function (req, res, next) {
  const chat = await getChatByTs(req.params.id);
  res.send(chat);
});

router.post("/chat/api/messages", async function (req, res, next) {
  console.log(req.body);
  const chat = await postChat(req.body);
  res.send(chat);
});

router.put("/chat/api/messages/:id", async function (req, res, next) {
  const chat = await putChat(req.params.id, req.body);
  res.send(chat);
});

router.delete("/chat/api/messages/:id", async function (req, res, next) {
  const chat = await delChat(req.params.id);
  res.send(chat);
});

module.exports = router;
