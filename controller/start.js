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
    🤗 Hozrgi kunda kengayib borayotgan "BESH BOLA LAVASH" uchun bo'sh ish o'rinlari mavjud!
   
   📲Onlayn tarzda anketani to'ldiring, suhbatdan o'ting va safimizga qo'shiling!
   
    🤩 Biz nima beramiz:

   ▫️Qadriyatli va tajribali jamoa;
   ▫️Shaxsiy rivojlanish uchun imkoniyat;
   ▫️Korxona hisobidan bepul tushlik;
   ▫️Yaxshi oylik daromad;
   ▫️Turli rag'batlantirish va bonuslar;
   ▫️O'qish va tajriba olish imkoniyati;

   👀 Qanday insonlarni qidirmoqdamiz?

   - Chaqqon, qat'iyatli, harakatchan, ishini mas'uliyat bilan bajaradigan.
   - 18 yoshdan 35 yoshgacha 

   😊 Agar siz shunday inson bo'lsangiz biz sizni jamoada ko'rishdan hursand bo'lamiz.

   💵Oylik maosh suhbat davomida ma'lum qilinadi….

   📍1-Fillial - Besh bola Nur masjidi yonida
   📍2-Fillial - Vatniy, Zakazirno yonida
   📍3-Fillial - Farg'ona shahar San'at saroyi yonida`;

  if (user.role === "admin") {
    ctx.telegram.sendPhoto(id, "https://t.me/mobi_center_baza/34", {
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
      ctx.telegram.sendPhoto(id, "https://t.me/mobi_center_baza/34", {
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
