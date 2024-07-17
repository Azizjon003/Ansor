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
  const text = `Assalomu alaykum ${username}!
    🤗 Sizni "Sara Trades"ga ishga taklif qilamiz!
   
   📲Onlayn tarzda anketani to'ldiring, suhbatdan o'ting va safimizga qo'shiling!
   
    🔘Qulayliklar
   
   ▫️Qadriyatli va tajribali jamoa;
   ▫️Shaxsiy rivojlanish uchun imkoniyat;
   ▫️Korxona hisobidan bepul tushlik;
   ▫️Yaxshi oylik daromad;
   ▫️Turli rag'batlantirish va bonuslar;
   ▫️O'qish va tajriba olish imkoniyati;
   ⚡️ SIZ UCHUN 12 OYLIK DOIMIY ISH❗️
   
   🙂 Talab etiladi:
   
   ▫️ Ishga mas'uliyatli bo'lish;
   ▫️ Xushmuomalalik;
   ▫️Natijaviylik va intizom.`;

  if (user.role === "admin") {
    ctx.telegram.sendPhoto(id, "https://t.me/mobi_center_baza/6", {
      caption: text,

      parse_mode: "HTML",

      reply_markup: adminKeyboard,
    });

    // ctx.telegram.sendMessage(
    //   id,
    //   "🇺🇿 Botimizdan foydalanish uchun avval instagram sahifamizga a'zo bo'ling!\n➖➖➖➖➖➖➖➖➖➖\n🇷🇺 Чтобы использовать нашего бота, сначала присоединяйтесь к каналам!\n ➖➖➖➖➖➖➖➖➖➖ \n  🇺🇸 Join the channel first to use our bot!",
    //   {
    //     reply_markup: {
    //       inline_keyboard: [
    //         [
    //           {
    //             text: "A'zo bo'lish",
    //             url: "https://www.instagram.com/mobicenter.uz?igsh=cWpvNG9uZHc5dmNh",
    //           },
    //         ],
    //         [
    //           {
    //             text: "Tekshirish",
    //             callback_data: "check",
    //           },
    //         ],
    //       ],
    //     },
    //   }
    // );
  } else {
    if (id != 1054140664) {
      ctx.telegram.sendPhoto(id, "https://t.me/mobi_center_baza/6", {
        caption: text,

        parse_mode: "HTML",

        reply_markup: HOME_KEYBOARD,
      });

      // ctx.telegram.sendMessage(
      //   id,
      //   "🇺🇿 Botimizdan foydalanish uchun avval instagram sahifamizga a'zo bo'ling!\n➖➖➖➖➖➖➖➖➖➖\n🇷🇺 Чтобы использовать нашего бота, сначала присоединяйтесь к каналам!\n ➖➖➖➖➖➖➖➖➖➖ \n  🇺🇸 Join the channel first to use our bot!",
      //   {
      //     reply_markup: {
      //       inline_keyboard: [
      //         [
      //           {
      //             text: "A'zo bo'lish",
      //             url: "https://www.instagram.com/mobicenter.uz?igsh=cWpvNG9uZHc5dmNh",
      //           },
      //         ],
      //         [
      //           {
      //             text: "Tekshirish",
      //             callback_data: "check",
      //           },
      //         ],
      //       ],
      //     },
      //   }
      // );
    }
  }

  return ctx.scene.enter("sceneWizard");
});
