const { newWizart } = require("../index.js");
const users = require("../model/user.js");
const fs = require("fs");
const path = require("path");
const { getCommands, getItem, addLang } = require("../utility/addLang.js");
const { HOME_KEYBOARD } = require("../utility/keyboard.js");

const datas = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/commands.json"), "utf-8")
);
const contacts = getCommands("contact");

newWizart.hears(contacts, async (ctx) => {
  const id = ctx.update.message.from.id;
  const user = await users.findOne({ telegramId: id });
  const text = getItem(user.lang, "contact");
  ctx.telegram.sendMessage(id, text, {
    parse_mode: "HTML",
    reply_markup: addLang(user.lang, "home_keyboards"),
  });
});
