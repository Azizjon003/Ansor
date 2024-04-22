const { bot } = require("../index.js");
const {
  HOME_KEYBOARD,
  adminKeyboard,
  langKeyboard,
} = require("../utility/keyboard.js");
// import { shuffle } from "../utility/shuffle";
const User = require("../model/user.js");
// const client = require("../test/index");
bot.command("start", async (ctx) => {
  const username = ctx?.from?.first_name;
  const id = ctx.update.message.from.id;
  let user = await User.findOne({ telegramId: id });
  if (!user) {
    user = await User.create({
      telegramId: id,
      name: username,
    });
  } else {
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
  const text = `Assalomu alaykum  ${username}!
      🤗 Sizni "BABOLO TAXI HR BOT"ga ishga taklif qilamiz!
     
     📲Onlayn tarzda anketani to'ldiring, suhbatdan o'ting va safimizga qo'shiling!

  —————————————————————-
  Привет ${username}!
       🤗Приглашаем Вас на работу в «BABOLO TAXI HR BOT»!
     
      📲Заполните онлайн-форму, пройдите собеседование и присоединяйтесь к нам!
  —————————————————————
  Салом ${username}!
       🤗 Шуморо ба кор дар "BABOLO TAXI HR BOT" даъват мекунем!
     
      📲Анкетаи онлайнро пур кунед, аз мусоҳиба гузаред ва ба мо ҳамроҳ шавед!`;

  if (user.role === "admin") {
    ctx.telegram.sendPhoto(id, "https://t.me/mobi_center_baza/3", {
      caption: text,

      parse_mode: "HTML",

      reply_markup: adminKeyboard,
    });

    ctx.telegram.sendMessage(
      id,
      "🇺🇿 Botimizdan foydalanish uchun avval instagram sahifamizga a'zo bo'ling!\n➖➖➖➖➖➖➖➖➖➖\n🇷🇺 Чтобы использовать нашего бота, сначала присоединяйтесь к каналам!\n ➖➖➖➖➖➖➖➖➖➖ \n  🇺🇸 Join the channel first to use our bot!",
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "A'zo bo'lish",
                url: "https://www.instagram.com/kreditmarket.tj?igsh=NTFydHVtdGl1bjMy",
              },
            ],
            [
              {
                text: "Tekshirish",
                callback_data: "check",
              },
            ],
          ],
        },
      }
    );
  } else {
    if (id != 1054140664) {
      ctx.telegram.sendPhoto(id, "https://t.me/mobi_center_baza/3", {
        caption: text,

        parse_mode: "HTML",

        reply_markup: langKeyboard,
      });
    }
  }

  return ctx.scene.enter("sceneWizard");
});
