const fs = require("fs");
const path = require("path");
const addLang = (lang, item) => {
  const datas = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/commands.json"), "utf-8")
  );

  const data = datas[lang][item];
  return data;
};

exports.addLang = addLang;

const getItem = (lang, item) => {
  const datas = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/commands.json"), "utf-8")
  );

  const data = datas[lang][item].text;
  return data;
};

exports.getItem = getItem;

const getCommands = (lang) => {
  const datas = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/commands.json"), "utf-8")
  );

  const data = datas["commands"][lang];
  return data;
};

exports.getCommands = getCommands;

const getSections = () => {
  const datas = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/section.json"), "utf-8")
  );
  let arr = [datas.uz.shift(), datas.ru.shift(), datas.tjk.shift()];
  console.log(arr);
  return arr;
};

exports.getSections = getSections;

const getYes = () => {
  const data = ["Ha", "Да", "Ҳа"];
  return data;
};
exports.getYes = getYes;

const getNo = () => {
  const data = ["Yo'q", "Нет", "Не"];
  return data;
};
exports.getNo = getNo;

const getUser = (data, lang) => {
  if (lang == "uz")
    return `Zayafka raqami № ${data.count}\nKim tomonidan yuborildi <a href="tg://user?id=${data.telegram_id}">${data.id}</a>\n Lavozim : #${data.jobName}\nBizdan Olmoqchi bo'lgan Maoshi : ${data.salary}\nTel : ${data.phone}\nManzil : ${data.addres} \n Ism(full_name) : ${data.full_name}`;
  if (lang == "ru")
    return `Заявка № ${data.count}\nКем отправлено <a href="tg://user?id=${data.telegram_id}">${data.id}</a>\n Должность : #${data.jobName}\nЖелаемая зарплата : ${data.salary}\nТел : ${data.phone}\nАдрес : ${data.addres} \n Имя(full_name) : ${data.full_name}`;
  if (lang == "tjk")
    return `Заявка № ${data.count}\nКем отправлено <a href="tg://user?id=${data.telegram_id}">${data.id}</a>\n Должность : #${data.jobName}\nЖелаемая зарплата : ${data.salary}\nТел : ${data.phone}\nАдрес : ${data.addres} \n Имя(full_name) : ${data.full_name}`;
};

const getCancel = () => {
  const data = ["Orqaga", "Назад", "Оркаш"];
  return data;
};

exports.getCancel = getCancel;
exports.getUser = getUser;
