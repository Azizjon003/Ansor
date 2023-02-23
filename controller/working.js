const { newWizart } = require("../index.js");
const { HOME_KEYBOARD, yesNo, category } = require("../utility/keyboard.js");

newWizart.hears("Ansor savdo majmuasi bo'sh ish o'rinlari ⚡️", async (ctx) => {
  // const id = ctx.update.message.from.id;
  // const text =
  //   "Siz bilan yaqindan tanishish va dunyo qarashingizni bilishimiz uchun savollar berishimizga rozimisiz?";

  // ctx.telegram.sendMessage(id, text, {
  //   parse_mode: "HTML",
  //   reply_markup: yesNo,
  // });
  const id = ctx.update.message.from.id;
  const text = "Kategoriyani tanlang ⬇️";

  ctx.telegram.sendMessage(id, text, {
    parse_mode: "HTML",
    reply_markup: category,
  });
  return ctx.wizard.next();
});

newWizart.hears("Ha", async (ctx) => {
  const id = ctx.update.message.from.id;
  const text = "Kategoriyani tanlang ⬇️";

  ctx.telegram.sendMessage(id, text, {
    parse_mode: "HTML",
    reply_markup: category,
  });
  return ctx.wizard.next();
});

newWizart.hears("Yo'q", async (ctx) => {
  const id = ctx.update.message.from.id;
  const text = "Siz bosh sahifaga qaytadingiz ⬇️";

  ctx.telegram.sendMessage(id, text, {
    parse_mode: "HTML",
    reply_markup: HOME_KEYBOARD,
  });
});
