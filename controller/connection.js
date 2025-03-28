const { newWizart } = require("../index.js");
const { HOME_KEYBOARD } = require("../utility/keyboard.js");

newWizart.hears("Bog'lanish 📞", async (ctx) => {
  const id = ctx.update.message.from.id;
  const text =
    "<b>📞Biz bilan bog'lanish</b>" +
    "\n👨‍💻ADMIN BILAN BOG'LANISH: @business_leader_1";
  ctx.telegram.sendMessage(id, text, {
    parse_mode: "HTML",
    reply_markup: HOME_KEYBOARD,
  });
});
