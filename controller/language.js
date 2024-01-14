const { LangWizard } = require("../index.js");
const users = require("../model/user.js");
const { addLang } = require("../utility/addLang.js");
const { HOME_KEYBOARD } = require("../utility/keyboard.js");

LangWizard.hears("🇺🇿Uzbek", async (ctx) => {
  const id = ctx.update.message.from.id;
  await users.updateOne({ telegramId: id }, { lang: "uz" });
  ctx.telegram.sendMessage(id, "Til o'zgartirildi", {
    reply_markup: addLang("uz", "home_keyboards"),
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
              url: "https://www.instagram.com/babolo_education?igsh=eDk3dHMxdTg2dzlx",
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
  return ctx.wizard.next();
});

LangWizard.hears("🇷🇺Русский", async (ctx) => {
  const id = ctx.update.message.from.id;
  await users.updateOne({ telegramId: id }, { lang: "ru" });
  ctx.telegram.sendMessage(id, "Язык изменен", {
    reply_markup: addLang("ru", "home_keyboards"),
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
              url: "https://www.instagram.com/babolo_education?igsh=eDk3dHMxdTg2dzlx",
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
  return ctx.wizard.next();
});

LangWizard.hears("🇹🇯Тоҷикӣ", async (ctx) => {
  const id = ctx.update.message.from.id;
  await users.updateOne({ telegramId: id }, { lang: "tjk" });

  ctx.telegram.sendMessage(id, "Til o'zgartirildi", {
    reply_markup: addLang("tjk", "home_keyboards"),
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
              url: "https://www.instagram.com/babolo_education?igsh=eDk3dHMxdTg2dzlx",
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
  return ctx.wizard.next();
});

// LangWizard.hears("/start", async (ctx) => {
//   const id = ctx.update.message.from.id;
//   await users.updateOne({ telegramId: id }, { lang: "uz" });
//   ctx.telegram.sendMessage(id, "Til o'zgartirildi", {
//     reply_markup: HOME_KEYBOARD,
//   });
//   return ctx.wizard.next();
// });
