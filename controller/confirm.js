const { confirm } = require("../index");
const fs = require("fs");
const path = require("path");
const User = require("../model/user");

const datas = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/question.json"), "utf-8")
);
const {
  HOME_KEYBOARD,
  yesNo,
  category,
  cancel,
} = require("../utility/keyboard");
const { getYes, getNo, getItem, addLang } = require("../utility/addLang.js");

confirm.hears("Orqaga", async (ctx) => {
  const id = ctx.update.message.from.id;
  const text = "Siz bosh menyudasiz";
  // await User.update(
  //   { recent: null, job: null, questions: [], subjob: null },
  //   { where: { telegramId: id } }
  // );
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
    reply_markup: HOME_KEYBOARD,
  });

  return ctx.wizard.selectStep(0);
});

confirm.hears(getYes(), async (ctx) => {
  const id = ctx.update.message.from.id;

  const user = await User.findOne({ telegramId: id });
  const data = datas[user.lang][user.job];
  let recent = 0;

  await user.updateOne(
    {
      telegramId: id,
    },
    {
      recent: recent,
    }
  );

  ctx.telegram.sendMessage(id, data[recent], {
    parse_mode: "HTML",
    reply_markup: cancel,
  });
  return ctx.wizard.next();
});

confirm.hears(getNo(), async (ctx) => {
  const id = ctx.update.message.from.id;
  const user = await User.findOne({ telegramId: id });
  const text = getItem(user.lang, "home");

  ctx.telegram.sendMessage(id, text, {
    parse_mode: "HTML",
    reply_markup: addLang(user.lang, "home_keyboards"),
  });
  return ctx.wizard.selectStep(0);
});
