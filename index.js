const { Telegraf, Composer, session, Scenes } = require("telegraf");
// const { Sequelize } = require("sequelize");

const dotenv = require("dotenv");
const connectDB = require("./model");

dotenv.config({});

const TOKEN = process.env.BOT_TOKEN;
console.log(TOKEN);
require("./model");
const bot = new Telegraf(TOKEN);

const newWizart = new Composer();
exports.newWizart = newWizart;
require("./controller/connection.js");
require("./controller/admin.js"); // bajarildi
require("./controller/aboutWe.js");
require("./controller/working.js");
const working = new Composer();
exports.working = working;
require("./controller/category.js"); // bajarildi

const anketa = new Composer();
exports.anketa = anketa;

require("./controller/anketa.js"); // bajarildi

const confirm = new Composer();
exports.confirm = confirm;
require("./controller/confirm.js"); // bajaraldi
const answer = new Composer();
exports.answer = answer;
require("./controller/answer.js"); // bajarildi

const answerPhoto = new Composer();
exports.answerPhoto = answerPhoto;
require("./controller/photoAdd.js"); // bajarildi

const adminMessage = new Composer();
exports.adminMessage = adminMessage;
require("./controller/message.js"); // bajarildi
const menuSchema = new Scenes.WizardScene(
  "sceneWizard",
  newWizart,
  working,
  anketa,
  confirm,
  answer,
  answerPhoto,
  adminMessage
);

const stage = new Scenes.Stage([menuSchema]);
bot.use(session());
bot.use(stage.middleware());

import("./controller/start.js");

// bot.on("my_chat_member", (ctx) => {
//   console.log(ctx.update);
// });
bot.catch((error, ctx) => {
  console.log(error);
  const id = ctx?.from?.id;
  console.log(error.stack);
  // if (id != "1953925296") {
  //   bot.telegram.forwardMessage("1953925296", id, String(error.message));
  // }
  if (id) {
    ctx.telegram.sendMessage(id, "Xatolik yuz berdi /start ni bosing ");
  }
});

exports.bot = bot;

const start = async () => {
  console.log("Bot is running");
  await connectDB();
  bot.launch();
};

start();
