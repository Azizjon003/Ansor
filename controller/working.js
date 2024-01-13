const { newWizart } = require("../index.js");
const { HOME_KEYBOARD, yesNo, category } = require("../utility/keyboard.js");
const fs = require("fs");
const path = require("path");
const { getCommands, getItem, addLang } = require("../utility/addLang.js");
const users = require("../model/user.js");

const datas = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/commands.json"), "utf-8")
);
const anketa = getCommands("add");
newWizart.hears(anketa, async (ctx) => {
  // const id = ctx.update.message.from.id;
  // const text =
  //   "Siz bilan yaqindan tanishish va dunyo qarashingizni bilishimiz uchun savollar berishimizga rozimisiz?";

  // ctx.telegram.sendMessage(id, text, {
  //   parse_mode: "HTML",
  //   reply_markup: yesNo,
  // });
  const id = ctx.update.message.from.id;
  const user = await users.findOne({ telegramId: id });

  const text = getItem(user.lang, "anketa");

  ctx.telegram.sendMessage(id, text, {
    parse_mode: "HTML",
    reply_markup: category(user.lang),
  });
  return ctx.wizard.next();
});

// newWizart.hears("Ha", async (ctx) => {
//   const id = ctx.update.message.from.id;
//   const text = "Kategoriyani tanlang ⬇️";

//   ctx.telegram.sendMessage(id, text, {
//     parse_mode: "HTML",
//     reply_markup: category,
//   });
//   return ctx.wizard.next();
// });

// newWizart.hears("Yo'q", async (ctx) => {
//   const id = ctx.update.message.from.id;
//   const text = "Siz bosh sahifaga qaytadingiz ⬇️";

//   ctx.telegram.sendMessage(id, text, {
//     parse_mode: "HTML",
//     reply_markup: HOME_KEYBOARD,
//   });
// });
