const { newWizart } = require("../index.js");
const { adminKeyboard } = require("../utility/keyboard.js");
const db = require("../model/index.js");
const User = db.user;
newWizart.hears("Userlarni ko'rish", async (ctx) => {
  const id = ctx.update.message.from.id;
  const isUser = await User.findOne({ where: { telegramId: id } });
  if (isUser.role !== "admin") {
    return ctx.telegram.sendMessage(
      id,
      "Userlar ro'yxati.Uni ko'rish uchun admin bo'ling"
    );
  }
  const user = await User.count();
  const userToday = await User.count({
    where: {
      createdAt: {
        [db.Op.gte]: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      },
    },
  });

  let textMessage = `Userlar soni user: ${user}.\nBugun qo'shilganlar ro'yhati: ${userToday}\nBuyruq bajarildi.`;
  ctx.telegram.sendMessage(id, textMessage);
});
newWizart.hears("Faol userlar", async (ctx) => {
  const id = ctx.update.message.from.id;
  const isUser = await User.findOne({
    where: {
      telegramId: id,
    },
  });
  if (isUser.role !== "admin") {
    return ctx.telegram.sendMessage(
      id,
      "Userlar ro'yxati.Uni ko'rish uchun admin bo'ling"
    );
  }
  const UserActive = await User.findAll({
    limit: 10,
    order: [["updatedAt", "DESC"]],
  });
  let textMessage = `Faol userlar ro'yxati:\n`;
  let text = "";
  let sana = 0;
  for (let e of UserActive) {
    sana++;
    text += `<b>id: ${e.id} </b><b>${e.name}</b> \t <i> activ: <b>${
      e.active
    }</b>  <b>role:  <i>${
      e.role
    }</i></b></i>\n <b>last active: ${e.updatedAt.toString()}</b>\n TelegramId : <code>${
      e.telegramId
    }</code>\n\n`;
    if (sana == 5) {
      await ctx.telegram.sendMessage(id, textMessage + text, {
        parse_mode: "HTML",
      });
      text = "";
      sana = 0;
    }
  }
  await ctx.telegram.sendMessage(id, textMessage + text, {
    parse_mode: "HTML",
  });
});

newWizart.hears("Xabar yuborish", async (ctx) => {
  const id = ctx.update.message.from.id;
  const isUser = await User.findOne({
    where: {
      telegramId: id,
    },
  });
  if (isUser.role !== "admin") {
    return ctx.telegram.sendMessage(
      id,
      "Userlar ro'yxati.Uni ko'rish uchun admin bo'ling"
    );
  }
  const text = `Xabar matnini kiriting.`;
  ctx.telegram.sendMessage(id, text);
  return ctx.wizard.selectStep(6);
});
newWizart.command("users", async (ctx) => {
  const id = ctx.update.message.from.id;
  const user = await User.findOne({
    where: { telegramId: id },
  });
  if (user.role == "admin") {
    const users = await User.findAll({
      order: [["id", "ASC"]],
    });
    let userSoni = `Userlar ro'yhati: ${users.length} \n\n`;
    let text = "";
    let sana = 0;
    for (let e of users) {
      sana++;
      text += `<b>id: ${e.id} </b><b>${e.name}</b> \t <i> activ: <b>${e.status}</b>  <b>role:  <i>${e.role}</i></b></i>\n`;
      if (sana == 5) {
        await ctx.telegram.sendMessage(id, userSoni + text, {
          parse_mode: "HTML",
        });
        text = "";
        sana = 0;
      }
    }
    await ctx.telegram.sendMessage(id, userSoni + text, { parse_mode: "HTML" });
  } else {
    await ctx.telegram.sendMessage(
      id,
      "Siz admin emassiz bu huquqlar admin uchun"
    );
  }
});
