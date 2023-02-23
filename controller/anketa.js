const { anketa } = require("../index");
const { HOME_KEYBOARD, yesNo } = require("../utility/keyboard");
const fs = require("fs");
const db = require("../model/index");
const path = require("path");
const User = db.user;

anketa.hears("Orqaga", async (ctx) => {
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
anketa.hears("/start",async (ctx)=>{
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
})
anketa.on("message", async (ctx) => {
  
const datas = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/subsection.json"), "utf-8")
);
  const id = ctx.update.message.from.id;
  const text = ctx.update.message.text;
  const user = await User.findOne({ where: { telegramId: id } });
  const data = datas[user.job];
  console.log(user.job);
  console.log(data);
  console.log(text);
  const i = data.indexOf(text);
  console.log(i);
  if (i == -1) {
    ctx.telegram.sendMessage(id, "Bunday bo'lim mavjud emas");
    return 0;
  }

  await user.update({ subjob: i }, { where: { telegramId: id } });
  const txt =
    "Siz bilan yaqindan tanishish va dunyo qarashingizni bilishimiz uchun savollar berishimizga rozimisiz?";

  ctx.telegram.sendMessage(id, txt, {
    parse_mode: "HTML",
    reply_markup: yesNo,
  });

  return ctx.wizard.next();
});
