const { answer } = require("../index.js");

const {
  HOME_KEYBOARD,
  yesNo,
  category,
  cancel,
} = require("../utility/keyboard.js");
const User = require("../model/user.js");
const fs = require("fs");
const path = require("path");

answer.hears("Orqaga", async (ctx) => {
  const id = ctx.update.message.from.id;
  const text = "Siz bosh menyudasiz";
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

answer.on("message", async (ctx) => {
  const datas = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/question.json"), "utf-8")
  );
  const id = ctx.update.message.from.id;
  const text = ctx.update.message.text;
  const user = await User.findOne({ telegramId: id });
  const data = datas[user.job];
  let recent = user.recent * 1;
  console.log(recent, "ishlashini tekshir");

  recent = recent + 1;

  await User.updateOne(
    { telegramId: id },
    { $push: { questions: { $each: [text] } } }
  );

  console.log(recent, "ishlashini tekshiruvda");
  await User.updateOne(
    { telegramId: id },
    {
      recent: recent,
    }
  );
  if (recent == data.length) {
    ctx.telegram.sendMessage(
      id,
      "Enter so'zini yuboring va adminlarimiz siz bilan bog'lanadi",
      {
        parse_mode: "HTML",
      }
    );
    return ctx.wizard.next();
  }

  let keyboard = ["Orqaga", ...data[recent].slice(1)].map((el) => [
    { text: el },
  ]);

  console.log(data[recent]);

  ctx.telegram.sendMessage(id, data[recent][0], {
    parse_mode: "HTML",
    reply_markup: {
      keyboard: keyboard,
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
  // ctx.telegram.sendMessage(id, data[recent], {
  //   parse_mode: "HTML",
  // });
});
