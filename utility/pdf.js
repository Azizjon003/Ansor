// const puppeteer = require("puppeteer");
// const fs = require("fs");
// const path = require("path");

// async function ishla(arr, imgLink, id) {
//   const browser = await puppeteer.launch();

//   // Create a new page
//   const page = await browser.newPage();
//   let text = fs.readFileSync(path.join(__dirname, "../pdf/home.html"), "utf-8");
//   let txt = arr.join("\n");
//   text = text.replace(/{img}/g, imgLink);
//   let txt2 = text.replace(/{shuyer}/g, txt);

//   console.log(txt2);
//   fs.writeFileSync(path.join(__dirname, `../pdf/${id}.html`), txt2, "utf-8");
//   const html = fs.readFileSync(
//     path.join(__dirname, `../pdf/${id}.html`),
//     "utf8"
//   );
//   // console.log(html);
// const time = new Date().getTime();
// const pdF = path.join(__dirname, "../src", `${time}.pdf`);
// // const html = fs.readFileSync(
// //   path.join(__dirname, "../pdf/home.html"),
// //   "utf8"
// // );
//   await page.setContent(html, { waitUntil: "load" });
//   await page.emulateMediaType("screen");

//   const pdf = await page.pdf({
//     path: pdF,
//     margin: { top: "50px", right: "50px", bottom: "50px", left: "50px" },
//     printBackground: true,
//     format: "A4",
//   });

//   await browser.close();

//   return pdF;
// }

// // ishla();
// module.exports = ishla;

const pdfMake = require("pdfmake");
const Printer = new pdfMake({
  Roboto: {
    normal: "fonts/Roboto-Italic.ttf",
  },
});
const fs = require("fs");
const path = require("path");
const ishla = async (arr, imgLink, id) => {
  let doc = {
    content: [
      {
        image: imgLink,
        width: 300,
        height: 300,
      },
      ...arr,
    ],
  };
  const time = new Date().getTime();
  const pdf = path.join(__dirname, "../src", `${time}.pdf`);
  let pdfDoc = Printer.createPdfKitDocument(doc);
  await pdfDoc.pipe(fs.createWriteStream(pdf));
  await pdfDoc.end();
  // const html = fs.readFileSync(
  //   path.join(__dirname, "../pdf/home.html"),
  //   "utf8"
  // );
  await sleep(500);

  return pdf;
};
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = ishla;
