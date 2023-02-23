const { answerPhoto, bot } = require("../index");
const { HOME_KEYBOARD } = require("../utility/keyboard");

const axios = require("axios");
const db = require("../model/index");
const fs = require("fs");
const path = require("path");
const replaceText = require("../utility/pdf");

const jobData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/section.json"))
);

const User = db.user;
answerPhoto.hears("Orqaga", async (ctx) => {
  const id = ctx.update.message.from.id;
  const text = "Siz bosh menyudasiz";
  await User.update(
    { recent: null, job: null, questions: [], subjob: null },
    { where: { telegramId: id } }
  );
  ctx.telegram.sendMessage(id, text, {
    parse_mode: "HTML",
    reply_markup: HOME_KEYBOARD,
  });

  return ctx.wizard.selectStep(0);
});
answerPhoto.on("photo", async (ctx) => {
  const datas = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/question.json"), "utf-8")
  );
  const subJobData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/subsection.json"))
  );
  const id = ctx.update.message.from.id;
  await ctx.telegram.sendMessage(id, "Bir oz kuting jo'natilmoqda.");
  let count = Number(fs.readFileSync(path.join(__dirname, "../count.txt")));
  const photo =
    ctx.message?.photo[4]?.file_id ||
    ctx.message?.photo[3]?.file_id ||
    ctx.message?.photo[2]?.file_id;

  // await ctx.telegram.sendPhoto(id, photo);
  console.log(ctx.message);
  const time = new Date().getTime();
  const image = await ctx.telegram.getFileLink(photo);
  console.log(image);
  const data = await axios.get(image.href, { responseType: "stream" });

  let link = `${__dirname}/temp/${time}.jpg`;
  await data.data.pipe(fs.createWriteStream(link));

  const user = await User.findOne({
    where: {
      telegramId: id,
    },
  });

  const dataQ = datas[user.job];
  let arr = user.questions;
  let arrcha = [];
  let userArr = [];
  let obj = {};
  // obj.img = image.href;
  for (let i = 0; i < dataQ.length; i++) {
    arrcha.push(`\n${i + 1}.${dataQ[i]}: ${arr[i]}`);
  }
  // userArr.push(obj);
  const phone = arr[2];
  const salary = arr[dataQ.length - 2];
  const job = user.job;
  const jobName = subJobData[job][user.subjob];
  const addres = arr[1];

  const url = await replaceText(arrcha, link, id);

  const txt = `Zayafka raqami № ${count}\nKim tomonidan yuborildi <a href="tg://user?id=${id}">${user.id}</a>\n Lavozim : #${jobName}\nBizdan Olmoqchi bo'lgan Maoshi : ${salary}\nTel : ${phone}\nManzil : ${addres}`;
  const dtd = fs.readFileSync(url);
  await ctx.telegram.sendDocument(
    "-1001829465518",
    {
      source: dtd,
      filename: `user.pdf`,
    },
    {
      caption: txt,
      parse_mode: "HTML",
    }
  );
  await User.update(
    { recent: null, job: null, questions: [], subjob: null },
    { where: { telegramId: id } }
  );
  ctx.telegram.sendMessage(
    id,
    "\nSizning anketangiz hodimlarimizga muvaffaqiyatli jo‘natildi.\nMutahassislarimiz tomonidan ko'rib chiqiladi va tanlov asosida suhbatga chaqiriladi.\nSiz bosh menyudasiz.",
    {
      reply_markup: HOME_KEYBOARD,
    }
  );
  fs.writeFileSync(path.join(__dirname, "../count.txt"), `${count + 1}`);
  return ctx.wizard.selectStep(0);
});
