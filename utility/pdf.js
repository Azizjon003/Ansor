const pdfMake = require("pdfmake");
const Printer = new pdfMake({
  Roboto: {
    normal: "fonts/Roboto-Italic.ttf",
  },
});
const fs = require("fs");
const path = require("path");
const ishla = async (arr, id) => {
  let doc = {
    content: [...arr],
    fonstSize: 20,
  };
  const time = new Date().getTime();
  const pdf = path.join(__dirname, "../src", `${time}.pdf`);
  let pdfDoc = Printer.createPdfKitDocument(doc);
  pdfDoc.pipe(fs.createWriteStream(pdf));
  pdfDoc.end();

  await sleep(500);

  return pdf;
};
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = ishla;
