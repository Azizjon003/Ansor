const { answer } = require("../index.js");

const {
  HOME_KEYBOARD,
  yesNo,
  category,
  cancel,
} = require("../utility/keyboard.js");
const db = require("../model/index");
const sequelize = db.sequelize;
const User = db.user;
const fs = require("fs");
const path = require("path");


answer.hears("Orqaga", async (ctx) => {
  const id = ctx.update.message.from.id;
  const text = "Siz bosh menyudasiz";
  await User.update(
    { recent: null, job: null, questions: [], subjob: null },
    { where: { telegramId: id } }
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
  const user = await User.findOne({ where: { telegramId: id } });
  console.log(user.questions);
  const data = datas[user.job];
  let recent = user.recent * 1;

  recent = recent + 1;

  User.update(
    {
      questions: sequelize.fn("array_append", sequelize.col("questions"), text),
    },
    { where: { telegramId: id } }
  );
  await user.update({ recent: recent }, { where: { telegramId: id } });
  if (recent == data.length) {
    ctx.telegram.sendMessage(
      id,
      "Rasmingizni yuboring (Selfi ko’rinishida yoki 3x4):",
      {
        parse_mode: "HTML",
        reply_markup: cancel,
      }
    );

    // User.update(
    //   {
    //     questions: sequelize.fn(
    //       "array_append",
    //       sequelize.col("questions"),
    //       text
    //     ),
    //   },
    //   { where: { telegramId: id } }
    // );
    return ctx.wizard.next();
  }
  ctx.telegram.sendMessage(id, data[recent], {});
});
