const fs = require("fs");
const pdf = require("html-pdf");
const path = require("path");

let text = fs.readFileSync(path.join(__dirname, "../pdf/home.html"), "utf-8");

const replaceText = async (arr, imgLink, users) => {
  let txt = arr.join("\n");
  text = text.replace(/{img}/g, imgLink);
  let txt2 = text.replace(/{shuyer}/g, txt);

  // console.log(txt2);
  fs.writeFileSync(path.join(__dirname, "../pdf/home2.html"), txt2, "utf-8");
  const html = fs.readFileSync(
    path.join(__dirname, "../pdf/home2.html"),
    "utf8"
  );
  // console.log(html);
  const pdF = path.join(__dirname, "../src", "users.pdf");

  // const options = {
  //   format: "A4",
  //   orientation: "portrait",
  //   border: "10mm",
  // };

  // const documents = {
  //   html: html,
  //   data: {
  //     users: users,
  //   },
  //   path: "./users.pdf",
  //   type: "",
  // };
  var options = { format: "Letter" };
  // pdf.create(html, options).toFile("./users.pdf", function (err, res) {
  //   // console.log(err);
  //   console.log(res);
  // });
  pdf.create(html).toStream(function (err, stream) {
    stream.pipe(fs.createWriteStream("./foo.pdf"));
  });
};

replaceText();
module.exports = replaceText;
