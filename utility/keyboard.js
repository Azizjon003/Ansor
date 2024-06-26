const fs = require("fs");
const path = require("path");

const HOME_KEYBOARD = {
  keyboard: [
    [{ text: "🧾 Anketa to'ldirish" }],
    [
      {
        text: "Bog'lanish 📞",
      },
    ],
  ],
  resize_keyboard: true,
  one_time_keyboard: true,
};
exports.HOME_KEYBOARD = HOME_KEYBOARD;

const cancel = {
  keyboard: [[{ text: "Orqaga" }]],
  resize_keyboard: true,
  one_time_keyboard: true,
};
exports.cancel = cancel;
const yesNo = {
  keyboard: [[{ text: "Ha" }, { text: "Yo'q" }]],
  resize_keyboard: true,
  one_time_keyboard: true,
};

exports.yesNo = yesNo;
// Path: utility/keyboard.js
// compare Category keyboard

const pathUrl = path.join(__dirname, "../data/section.json");
const datas = JSON.parse(fs.readFileSync(pathUrl, "utf-8"));

let arr = [];
for (let i = 0; i < datas.length; i++) {
  if ((i + 1) % 2 == 0 && i != 0) {
    arr.push([{ text: datas[i] }, { text: datas[i - 1] }]);
  }
}

//arr.push([{ text: "Orqaga" }]);

const category = {
  keyboard: arr,
  resize_keyboard: true,
  one_time_keyboard: true,
};

exports.category = category;

const adminKeyboard = {
  keyboard: [
    [{ text: "🧾 Anketa to'ldirish" }],
    [
      {
        text: "Bog'lanish 📞",
      },
    ],
    [
      {
        text: "Userlarni ko'rish ",
      },
      {
        text: "Faol userlar",
      },
    ],
    [
      {
        text: "Xabar yuborish",
      },
    ],
  ],
  resize_keyboard: true,
  one_time_keyboard: true,
};

const addInlineKeyboard = (arr) => {
  let left = [];
  let right = [];

  for (let i = 0; i < arr.length; i += 2) {
    let arrcha = [];
    let arrcha2 = [];
    let arrcha3 = [];
    if (arr[i].length > 25) {
      arrcha2.push({
        text: arr[i],
        callback_data: arr[i],
      });
    } else {
      arrcha.push({
        text: arr[i],
        callback_data: arr[i],
      });
    }

    if (i + 1 < arr.length) {
      if (arr[i + 1].length > 25) {
        arrcha3.push({
          text: arr[i + 1],
          callback_data: arr[i + 1],
        });
      } else {
        arrcha.push({
          text: arr[i + 1],
          callback_data: arr[i + 1],
        });
      }
    }

    left.push(arrcha);
    left.push(arrcha2);
    left.push(arrcha3);
  }

  let data = [];
  return left;
};

exports.addInlineKeyboard = addInlineKeyboard;
exports.adminKeyboard = adminKeyboard;
