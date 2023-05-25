const { anketa } = require("../index");
const { HOME_KEYBOARD, yesNo } = require("../utility/keyboard");
const fs = require("fs");
// const db = require("../model/index");
const path = require("path");
// const User = db.user;
const User = require("../model/user");

anketa.hears("Orqaga", async (ctx) => {
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
anketa.hears("/start", async (ctx) => {
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
anketa.on("message", async (ctx) => {
  const datas = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/subsection.json"), "utf-8")
  );
  const id = ctx.update.message.from.id;
  const text = ctx.update.message.text;
  const user = await User.findOne({ telegramId: id });
  const data = datas[user.job];
  const i = data.indexOf(text);
  if (i == -1) {
    ctx.telegram.sendMessage(id, "Bunday bo'lim mavjud emas");
    return 0;
  }
  await User.updateOne(
    {
      telegramId: id,
    },
    {
      subjob: i,
    }
  );
  const txt =
    "Siz bilan yaqinroq tanishishimiz uchun quyidagi savollarga javob berishingizni so'raymiz.\n Rozimisiz? 😉";

  ctx.telegram.sendMessage(id, txt, {
    parse_mode: "HTML",
    reply_markup: yesNo,
  });

  return ctx.wizard.next();
});
