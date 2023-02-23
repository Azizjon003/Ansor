const fs = require("fs");
const path = require("path");
const url = path.join(__dirname, "/text.txt");

const text = fs.readFileSync(url, "utf-8");

let arr = text.split("\n");

for (let i = 0; i < arr.length; i++) {
  arr[i] = arr[i].split(".")[1]?.trim();
}

fs.writeFileSync("text.json", JSON.stringify(arr));
