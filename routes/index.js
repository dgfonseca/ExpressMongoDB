var express = require("express");
var router = express.Router();
const Joi = require("joi");

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
  if (chat.length === 0) {
    res.send("No se encontró");
  } else res.send(chat);
});

router.post("/chat/api/messages", async function (req, res, next) {
  const { error } = validateChat(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  const chat = await postChat(req.body);
  res.send(chat);
});

router.put("/chat/api/messages/:id", async function (req, res, next) {
  const { error } = validateChat(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  const chat = await putChat(req.params.id, req.body);
  res.send(chat);
});

router.delete("/chat/api/messages/:id", async function (req, res, next) {
  const chat = await delChat(req.params.id);
  res.send(chat);
});

module.exports = router;

const validateChat = (client) => {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string().required(),
    ts: Joi.string().required(),
  });

  return schema.validate(client);
};
