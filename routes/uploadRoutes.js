const router = require("express").Router();
const csv = require("csv");
const fs = require("fs");
const model = require("../models");
const csvParse = require("csv-parse")
const through2 = require("through2")
const Readable = require("stream").Readable;

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// upload a balanza to the db
// matches with /api/upload/balanza
router.post("/balanza", upload.single("csvFile"), function (req, res, next) {

  const fileBuffer = req.file.buffer;
  const fileName = req.file.originalname;
  const auditId = req.body.auditId;

  console.log("\n\n\n\n\n");

  // first, write the file coming from the frontend
  fs.writeFile("uploads/" + fileName, fileBuffer, function (err) {
    if (err) throw err;
    console.log("writing file in uploads...");
  });

  // // after that, delete it
  // fs.unlink("uploads/" + fileName, function (err) {
  //   if (err) throw err;
  //   console.log("now deleting file...");
  //   // res.send("process finished");
  // });

  res.send("balanzas saved and deleted");

});

module.exports = router;
