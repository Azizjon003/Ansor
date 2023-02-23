const { adminMessage } = require("..");

const db = require("../model/index.js");
const User = db.user;

adminMessage.on("message", async (ctx) => {
  const id = ctx.update.message.from.id;
  const text = ctx.update.message.text.trim();
  const users = await User.findAll();
  console.log(users);

  for (let i = 0; i < users.length; i++) {
    try {
      await ctx.telegram.sendMessage(users[i].telegramId, text, {
        parse_mode: "HTML",
      });
    } catch (error) {
      console.log(error);
      ctx.telegram.sendMessage(id, `Xatolik yuz berdi ${error.message}`);
    }
  }

  await User.update(
    {
      command: "",
    },
    {
      where: {
        telegram_id: id,
      },
    }
  );

  ctx.telegram.sendMessage(
    id,
    "Buyruqlar bajarildi menga Ruxsat Admin  😎.Siz bosh menyudasiz"
  );
  return ctx.wizard.selectStep(0);
});
