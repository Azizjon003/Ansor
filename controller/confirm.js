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

confirm.hears("Ha", async (ctx) => {
  const id = ctx.update.message.from.id;

  const user = await User.findOne({ telegramId: id });
  const data = datas[user.job];
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

confirm.hears("Yo'q", async (ctx) => {
  const id = ctx.update.message.from.id;
  const text = "Siz bosh sahifaga qaytadingiz ⬇️";

  ctx.telegram.sendMessage(id, text, {
    parse_mode: "HTML",
    reply_markup: HOME_KEYBOARD,
  });
  return ctx.wizard.selectStep(0);
});
