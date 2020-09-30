var express = require("express");
var router = express.Router();
var [getChats, getChatByTs] = require("../controler/chat");

/* GET users listing. */
router.get("/chat/api/messages", async function (req, res, next) {
  const chat = await getChats();
  res.send(chat);
});

router.get("/chat/api/messages/:id", async function (req, res, next) {
  const chat = await getChatByTs(req.params.id);
  res.send(chat);
});

module.exports = router;
