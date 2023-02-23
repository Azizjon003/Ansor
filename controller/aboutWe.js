const { newWizart } = require("../index.js");
const { HOME_KEYBOARD } = require("../utility/keyboard.js");

newWizart.hears("Biz haqimizda 💠", async (ctx) => {
  const id = ctx.update.message.from.id;
  const text =
    "<b>Uzoq kutilgan onlar🤩</b>" +
    "\n" +
    " <b>Tez kunda «Ansor Savdo Majmuasi» ochilish marosimi bo’lib o’tadi.</b>\n <b>Barcha yangiliklar bilan Instagram va Telegram sahifalarimizda yoritib boramiz.</b>" +
    "\n" +
    "<b>Manzil:</b>\n <b>📍Marg'ilon markazi</b>";
  ctx.telegram.sendVideo(id, "https://t.me/azizjon_aliqulov/4", {
    caption: text,
    parse_mode: "HTML",
  });
  // return ctx.scene.;
  // return ctx.scene.enter("sceneWizard");
});
