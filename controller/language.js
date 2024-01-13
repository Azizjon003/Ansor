const { LangWizard } = require("../index.js");
const users = require("../model/user.js");
const { HOME_KEYBOARD } = require("../utility/keyboard.js");

LangWizard.hears("🇺🇿Uzbek", async (ctx) => {
  const id = ctx.update.message.from.id;
  await users.updateOne({ telegramId: id }, { lang: "uz" });
  ctx.telegram.sendMessage(id, "Til o'zgartirildi", {
    reply_markup: HOME_KEYBOARD,
  });
  return ctx.wizard.next();
});

LangWizard.hears("🇷🇺Русский", async (ctx) => {
  const id = ctx.update.message.from.id;
  await users.updateOne({ telegramId: id }, { lang: "ru" });
  ctx.telegram.sendMessage(id, "Язык изменен", {
    reply_markup: HOME_KEYBOARD,
  });
  return ctx.wizard.next();
});

LangWizard.hears("🇹🇯Тоҷикӣ", async (ctx) => {
  const id = ctx.update.message.from.id;
  await users.updateOne({ telegramId: id }, { lang: "tjk" });
  ctx.telegram.sendMessage(id, "Til o'zgartirildi", {
    reply_markup: HOME_KEYBOARD,
  });
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
