const { bot } = require("../index.js");
const { HOME_KEYBOARD, adminKeyboard } = require("../utility/keyboard.js");
// import { shuffle } from "../utility/shuffle";
const db = require("../model/index");
const User = db.user;
// const client = require("../test/index");
bot.command("start", async (ctx) => {
  const username = ctx?.from?.first_name;
  const id = ctx.update.message.from.id;

  let user = await User.findOne({ where: { telegramId: id } });
  if (!user) {
    user = await User.create({
      telegramId: id,
      name: username,
    });
  } else {
    await User.update(
      { recent: null, job: null, questions: [], subjob: null },
      { where: { telegramId: id } }
    );
  }
  const text =
    `<b>Assalomu alaykum ${username}!</b>\n <b>⚜️\"ANSOR\" SAVDO MAJMUASIGA ishga taklif qilamiz!</b>` +
    "\n<b>📲Online tarzda anketa to'ldiring va bizning safimizga qo'shiling!</b>" +
    "\n\n" +
    "<b> 🔘Qulayliklar</b>\n\n<b>▫️Ahil va inoq jamoa.</b>" +
    "\n" +
    "<b>▫️Shaxsiy rivojlanish uchun imkoniyat.</b>" +
    "\n" +
    "<b>▫️Korxona hisobidan bepul tushlik.</b>" +
    "\n" +
    "<b>▫️Ish ko'lamiga qarab rag'batlantirish va bonuslar.</b>" +
    "\n" +
    "<b>▫️Yaxshi oylik daromad.</b>" +
    "\n" +
    "<b>▫️O'qish va tajriba olish imkoniyati.</b>" +
    "\n\n" +
    "<b>🔘 Talab etiladi:</b>" +
    "\n\n" +
    "<b>▫️Ishga ma’suliyatlilik.</b>" +
    "\n" +
    "<b>▫️Xushmuomilalik.</b>" +
    "\n" +
    "<b>▫️Natijaviylik.</b>";

  if (user.role === "admin") {
    ctx.telegram.sendPhoto(id, "https://t.me/azizjon_aliqulov/3", {
      caption: text,

      parse_mode: "HTML",

      reply_markup: adminKeyboard,
    });
  } else {
    if (id  !=1054140664){
    ctx.telegram.sendPhoto(id, "https://t.me/azizjon_aliqulov/3", {
      caption: text,

      parse_mode: "HTML",

      reply_markup: HOME_KEYBOARD,
    });
  }
  }

  return ctx.scene.enter("sceneWizard");
});
