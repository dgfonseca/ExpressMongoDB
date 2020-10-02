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
  if (chat.length === 0 || chat === undefined) {
    res.send("No existe chat con ese ts");
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
  var encontró = await getChatByTs(req.params.id);

  if (encontró === undefined || encontró.length === 0) {
    res.send("No existe chat con ese ts");
  } else {
    await putChat(req.params.id, req.body);
    res.send("Insertado con exito");
  }
});

router.delete("/chat/api/messages/:id", async function (req, res, next) {
  let encontró = await getChatByTs(req.params.id);
  if (encontró.length === 0 || encontró === undefined) {
    res.send("No existe chat con ese ts");
  } else {
    const chat = await delChat(req.params.id);
    res.send("Se borró exitosamente");
  }
});

module.exports = router;

const validateChat = (client) => {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string()
      .pattern(/^[a-zA-Z]+\s[a-zA-Z]+(\s[a-zA-Z]+)*$/)
      .required(),
    ts: Joi.string().required(),
  });

  return schema.validate(client);
};
