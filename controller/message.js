const { adminMessage } = require("..");

const User = require("../model/user");

adminMessage.on("message", async (ctx) => {
  const id = ctx.update.message.from.id;
  const text = ctx.update.message.text.trim();
  const users = await User.find();
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

  await User.updateOne(
    {
      telegram_id: id,
    },
    {
      command: "",
    }
  );

  ctx.telegram.sendMessage(
    id,
    "Buyruqlar bajarildi menga Ruxsat Admin  😎.Siz bosh menyudasiz"
  );
  return ctx.wizard.selectStep(0);
});
