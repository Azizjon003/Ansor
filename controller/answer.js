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
  console.log(user.questions);
  const data = datas[user.job];
  let recent = user.recent * 1;
  console.log(recent, "ishlashini tekshir");

  recent = recent + 1;

  // User.update(
  //   {
  //     questions: sequelize.fn("array_append", sequelize.col("questions"), text),
  //   },
  //   { where: { telegramId: id } }
  // );

  await User.updateOne(
    { telegramId: id },
    { $push: { questions: { $each: [text] } } }
  );

  // await user.update({ recent: recent }, { where: { telegramId: id } });
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
      "Rasmingizni yuboring (Selfi ko’rinishida yoki 3x4):",
      {
        parse_mode: "HTML",
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
  ctx.telegram.sendMessage(id, data[recent], {
    parse_mode: "HTML",
  });
});
