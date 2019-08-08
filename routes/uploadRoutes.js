const router = require("express").Router();
const csv = require("csv");
const fs = require("fs");
const model = require("../models");
const csvParse = require('csv-parse')
const through2 = require('through2')
const Readable = require("stream").Readable;

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// upload a balanza to the db
// matches with /api/upload/balanza
router.post("/balanza", upload.single("csvFile"), function (req, res) {

  console.log("=====================csvFile==========================");
  console.log(req.file);

  const file = req.file.buffer;
  fs.writeFile("uploads/" + req.file.originalname, file, function (error) {
    if (error) {
      res.json(error);
    }
    res.send("Se guardó el archivo.");
  })

  // const s = new Readable();
  // s._read = () => { }; // redundant? see update below
  // s.push(req.body.file);

  // fs.createReadStream("uploads/" + req.file.originalname)
  //   .pipe(csvParse({ auto_parse: true }))
  //   .pipe(through2.obj(function (chunk, encoding, callback) {
  //     this.push({
  //       auditId: req.body.auditId,
  //       mes: chunk[0],
  //       rubro: chunk[1],
  //       clasificación: chunk[2],
  //       cuenta: chunk[3],
  //       subCuenta: chunk[4],
  //       saldoInicial: chunk[5],
  //       cargos: chunk[6],
  //       abonos: chunk[7],
  //       saldoFinal: chunk[8]
  //     })
  //     callback()
  //   }))
  //   .on("data", function (record) {
  //     console.log(JSON.stringify(record, null, 4))
  //   })



  // const input = fs.createReadStream(req.body);
  // const s = new Readable();
  // s._read = () => { }; // redundant? see update below
  // s.push(req.body.file);
  // s.push(null);

  // const parser = csv.parse({
  //   delimiter: ",",
  //   columns: true
  // });

  // const transform = csv.transform(function (row) {
  //   const balanza = {
  //     auditId: req.body.auditId,
  //     mes: row["mes"],
  //     rubro: row["rubro"],
  //     clasificación: row["clasificación"],
  //     cuenta: row["cuenta"],
  //     subCuenta: row["subCuenta"],
  //     saldoInicial: row["saldoInicial"],
  //     cargos: row["cargos"],
  //     abonos: row["abonos"],
  //     saldoFinal: row["saldo final"]
  //   }
  //   // console.log(balanza);
  // })


  // s.pipe(parser).pipe(transform)




  // model.Audit.create({
  //   // id: req.body.id,
  //   clientName: req.body.clientName,
  //   clientAcronym: req.body.clientAcronym,
  //   year: req.body.year,
  //   description: req.body.description
  // })
  //   .then(function (res) {
  //     res.json(res);
  //   })
  //   .catch(function (err) {
  //     res.send(err);
  //   });

});

module.exports = router;
