const { working } = require("../index.js");
const fs = require("fs");
const path = require("path");
const User = require("../model/user.js");
const {
  HOME_KEYBOARD,
  cancel,
  category,
  yesNo,
} = require("../utility/keyboard.js");

const pathUrl = path.join(__dirname, "../data/section.json");
const datas = JSON.parse(fs.readFileSync(pathUrl, "utf-8"));

const pathUrkCategory = path.join(__dirname, "../data/subsection.json");

working.hears("Orqaga", async (ctx) => {
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

working.hears(datas, async (ctx) => {
  const id = ctx.update.message.from.id;
  const text = ctx.update.message.text;

  const i = datas.indexOf(text);
  console.log(i);
  const user = await User.findOne({ telegramId: id });

  // await user.update({ job: i }, { where: { telegramId: id } });

  await User.updateOne({ telegramId: id }, { job: i });

  const dataCategory = JSON.parse(fs.readFileSync(pathUrkCategory, "utf-8"));
  
  console.log(dataCategory);
  let category = dataCategory[i];
  let textcha = category.join(" | ")
  
  const txt = "Kerakli bo'limni tanlang" + `\n ${textcha} \n`;
  let arr = [];

  if (typeof category !== "undefined" && category.length > 0) {
    for (let i = 0; i < category.length; i++) {
      arr.push([{ text: category[i] }]);
    }
    arr.push([{ text: "Orqaga" }]);
    ctx.telegram.sendMessage(id, txt, {
      parse_mode: "HTML",
      reply_markup: {
        keyboard: arr,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
    return ctx.wizard.next();
  } else {
    ctx.telegram.sendMessage(id, "Bo'limlar mavjud emas", {
      parse_mode: "HTML",
      reply_markup: HOME_KEYBOARD,
    });
  }
});
