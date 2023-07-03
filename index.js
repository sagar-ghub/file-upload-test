//Import
const express = require("express");
// const knexdb = require("./src/db/index");
// const bodyParser=require("body-parser")
// const crypto = require("crypto-js");

const fileUpload = require("express-fileupload");
//Initialize

const app = express();

app.listen(3000, console.log("Server is running on port 3000"));

//routes

app.use(express.json());

app.use(fileUpload());
// console.log(__dirname);
app.use(express.static(__dirname + "/public/images")); /// for exposing local directory

app.get("/", async (req, res) => {
  // const data = await knexdb.select("*").from("ptr_employee").where("id", 1);
  // console.log(data);

  return res.status(200).json({
    // message: data,
    name: "John Doe",
  });
});

app.post("/body", (req, res) => {
  console.log(req.body);

  console.log(req.body.age);
});

app.get("/home", async (req, res) => {
  //query params
  const name = req.query.name;
  const email = req.query.email;
  const phone = req.query.phone;

  // await knexdb("ptr_employee").insert({
  //   employee_name: name,
  //   employee_email: email,
  //   employee_phone: phone,
  // });
  return res.status(200).json({
    message: `data inserted`,
  });
});
app.post("/home", (req, res) => {
  return res.status(200).json({
    message: "Hello Post Home",
  });
});
app.post("/fileUpload", async (req, res) => {
  // const name = req.body.name;
  // const email = req.body.email;
  const file = req.files.img;
  // console.log(name, email);

  await file.mv("public/images/" + file.name, async (err) => {
    if (err) {
      console.log(err);
      return res.status(300).json({ message: "file upload was cancelled" });
    }

    // await knexdb("ptr_employee").insert({
    //   employee_name: name,
    //   employee_email: email,
    //   employee_file: file.name,
    // });
  });

  return res.status(200).json({
    message: "file uploaded",
  });
});
app.get("/fileImgae", (req, res) => {
  //logic too get imagename from database
  // let data=select * from table_name where phone=7413

  // data.name
  // data.employee_file

  return res.status(200).json({
    message: "file found",
    image: `http://localhost:3000/public/images/${imagename}`,
  });
});
const fs = require("fs");
const https = require("https");

app.get("/getfile", (req, res) => {
  const url =
    "https://www2.census.gov/programs-surveys/acs/summary_file/2020/data/5_year_entire_sf/All_Geographies_Not_Tracts_Block_Groups.zip";
  const fileName = "census-data2.zip";

  const file = fs.createWriteStream(fileName);
  file.on("error", (err) => console.log(err));
  https.get(url).on("response", function (res) {
    let downloaded = 0;
    res.setTimeout(24 * 60 * 60 * 1000, () => console.log("timeout")); // 24 hours timeout
    res
      .on("data", function (chunk) {
        let readyForMore = file.write(chunk);
        if (!readyForMore) {
          // pause readstream until drain event comes
          res.pause();
          file.once("drain", () => {
            res.resume();
          });
        }
        downloaded += chunk.length;
        console.log(chunk.length);
        process.stdout.write(
          `Downloaded ${(downloaded / 1000000).toFixed(2)} MB of ${fileName}\r`
        );
      })
      .on("end", function () {
        file.end();
        console.log(`${fileName} downloaded successfully.`);
      })
      .on("error", (err) => console.log(err));
  });
});

// var AES = require("crypto-js/aes");
// var SHA256 = require("crypto-js/sha256");

// const CryptoJS = require("crypto-js");

// // Get input parameters
// const secret = "abcd12345678901*";
// const initVector = "abcd12345678901*";
// const text =
//   "636172488301305970|RKT|EU01EU02000000000001|ART00MR000MR01|1000|0025667889";
// const mode = "CBC";
// const keySize = 128;
// const outType = "Base64";

// // Convert secret and initialization vector to WordArray objects
// const secretKey = CryptoJS.enc.Hex.parse(secret);
// const iv = CryptoJS.enc.Hex.parse(initVector);

// // Encrypt the text using AES-128 with CBC mode and PKCS#7 padding
// const encryptedText = CryptoJS.AES.encrypt(text, secret, {
//   iv: initVector,
//   mode: CryptoJS.mode.CBC,

//   keySize: keySize,
// });

// // Convert the encrypted text to the desired output type (Base64 or Hex)
// let output = "";
// if (outType.toLowerCase() === "base64") {
//   output = encryptedText.toString();
// } else if (outType.toLowerCase() === "hex") {
//   output = encryptedText.ciphertext.toString(CryptoJS.enc.Hex);
// }

// // Print the encrypted text and output type
// console.log("Encrypted text: ", output);
// console.log("Output type: ", outType);

// var encrypted = AES.encrypt(payload, secret);
// console.log("Encrypted: " + encrypted);

// const cipher = crypto.AES.encrypt(payload, crypto.enc.Utf8.parse(iv), {
//   iv: crypto.enc.Utf8.parse(iv), // parse the IV
//   padding: crypto.pad.Pkcs7,
//   mode: crypto.mode.CBC,
// });

// const encrypted1 = cipher.toString();
// const hash = SHA256(encrypted1 + salt).toString();
// // const hash = SHA256(encrypted).toString();
// // Printing the output
// console.log("Hash Obtained is: ", hash);
