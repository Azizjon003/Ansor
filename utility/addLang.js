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
