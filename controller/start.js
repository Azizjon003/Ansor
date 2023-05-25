const { bot } = require("../index.js");
const { HOME_KEYBOARD, adminKeyboard } = require("../utility/keyboard.js");
// import { shuffle } from "../utility/shuffle";
const User = require("../model/user.js");
// const client = require("../test/index");
bot.command("start", async (ctx) => {
  const username = ctx?.from?.first_name;
  const id = ctx.update.message.from.id;

  // let user = await User.findOne({ where: { telegramId: id } });
  let user = await User.findOne({ telegramId: id });
  if (!user) {
    user = await User.create({
      telegramId: id,
      name: username,
    });
  } else {
    // await User.update(
    //   { recent: null, job: null, questions: [], subjob: null },
    //   { where: { telegramId: id } }
    // );

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
  }
  const text =
    `Assalomu alaykum ${username}!\n <b>🤗 Sizni «Ansor» savdo markaziga ishga taklif qilamiz!</b>` +
    "\n\n<b>📲Onlayn tarzda anketani to'ldiring, suhbatdan o'ting va safimizga qo'shiling!</b>" +
    "\n\n" +
    "<b> 🔘Qulayliklar</b>\n\n▫️Qadriyatli va tajribali jamoa;" +
    "\n" +
    "▫️Shaxsiy rivojlanish uchun imkoniyat;" +
    "\n" +
    "▫️Korxona hisobidan bepul tushlik;" +
    "\n" +
    "▫️Yaxshi oylik daromad;" +
    "\n" +
    "▫️Turli rag'batlantirish va bonuslar;" +
    "\n" +
    "▫️O'qish va tajriba olish imkoniyati;" +
    "\n\n" +
    "<b>🙂 Talab etiladi:</b>" +
    "\n\n" +
    "▫️ Ishga mas'uliyatli bo'lish;" +
    "\n" +
    "▫️ Xushmuomalalik;" +
    "\n" +
    "▫️Natijaviylik va intizom.";

  if (user.role === "admin") {
    ctx.telegram.sendPhoto(id, "https://t.me/azizjon_aliqulov/3", {
      caption: text,

      parse_mode: "HTML",

      reply_markup: adminKeyboard,
    });
  } else {
    if (id != 1054140664) {
      ctx.telegram.sendPhoto(id, "https://t.me/azizjon_aliqulov/3", {
        caption: text,

        parse_mode: "HTML",

        reply_markup: HOME_KEYBOARD,
      });
    }
  }

  return ctx.scene.enter("sceneWizard");
});
