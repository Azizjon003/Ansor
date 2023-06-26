const { newWizart } = require("../index.js");
const { HOME_KEYBOARD } = require("../utility/keyboard.js");

newWizart.hears("Biz bilan bog'lanish 📞", async (ctx) => {
  const id = ctx.update.message.from.id;
  const text =
    "<b>📞Biz bilan bog'lanish</b>" +
    "\n 👨‍💻ADMIN BILAN BOG'LANISH: +998971167070";
  ctx.telegram.sendMessage(id, text, {
    parse_mode: "HTML",
    reply_markup: HOME_KEYBOARD,
  });
});
