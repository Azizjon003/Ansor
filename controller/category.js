const { working } = require("../index.js");
const fs = require("fs");
const path = require("path");
const User = require("../model/user.js");
const {
  HOME_KEYBOARD,
  cancel,
  category,
  yesNo,
  addInlineKeyboard,
} = require("../utility/keyboard.js");
const { getSections, getItem, getCancel } = require("../utility/addLang.js");

const pathUrl = path.join(__dirname, "../data/section.json");
const datas = JSON.parse(fs.readFileSync(pathUrl, "utf-8"));

const pathUrkCategory = path.join(__dirname, "../data/subsection.json");

working.hears(getCancel(), async (ctx) => {
  const id = ctx.update.message.from.id;
  const text = "Siz bosh menyudasiz";
  // await User.update(
  //   { recent: null, job: null, questions: [], subjob: null },
  //   { where: { telegramId: id } }
  // );
  const user = await User.findOne({
    telegramId: id,
  });
  await User.updateOne(
    { telegramId: id },
    {
      recent: null,
      job: null,
      questions: [],
      subjob: null,
    }
  );
  ctx.telegram.sendMessage(id, text, {
    parse_mode: "HTML",
    reply_markup: addLang(user.lang, "home_keyboards"),
  });

  return ctx.wizard.selectStep(0);
});

working.hears(getSections(), async (ctx) => {
  const id = ctx.update.message.from.id;
  const text = ctx.update.message.text;

  const user = await User.findOne({ telegramId: id });
  const i = datas[user.lang].indexOf(text);
  console.log(i);

  // await user.update({ job: i }, { where: { telegramId: id } });

  await User.updateOne({ telegramId: id }, { job: i });
  let txt = getItem(user.lang, "lavozim");
  let data = JSON.parse(fs.readFileSync(pathUrkCategory, "utf-8"));
  console.log(data);
  let inlineKeyboard = addInlineKeyboard(data[user.lang][0]);

  ctx.reply(txt, {
    reply_markup: {
      inline_keyboard: inlineKeyboard,
    },
  });
  return ctx.wizard.next();
});
