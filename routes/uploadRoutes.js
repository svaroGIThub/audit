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
router.post("/balanza", upload.single("csvFile"), function (req, res) {

  // console.log("=====================req.file==========================");
  // console.log(req.file);
  // console.log("=====================req.body.auditId==========================");
  // console.log(req.body.auditId);
  // console.log("=====================req.body.file==========================");
  // console.log(req.body);

  const file = req.file.buffer;
  fs.writeFile("uploads/" + req.file.originalname, file, function (error) {
    if (error) {
      res.json(error);
    }
    res.send("Se guardó el archivo.");
  })

  fs.createReadStream("uploads/" + req.file.originalname)
    .pipe(csvParse({ auto_parse: true }))
    .pipe(through2.obj(function (chunk, encoding, callback) {
      this.push({
        mes: chunk[0],
        rubro: chunk[1],
        clasificación: chunk[2],
        cuenta: chunk[3],
        subCuenta: chunk[4],
        saldoInicial: chunk[5],
        cargos: chunk[6],
        abonos: chunk[7],
        saldoFinal: chunk[8]
      })
      callback()
    }))
    .on("data", function (record) {

      // console.log(record.mes);

      // console.log("NUEVO RECORD ==============================================================");
      // console.log(JSON.stringify(record, null, 4))

      model.Balanza.create({
        auditId: req.body.auditId,
        mes: record.mes,
        rubro: record.rubro,
        clasificación: record.clasificación,
        cuentaMayor: record.cuentaMayor,
        subCuenta: record.subCuenta,
        cuentaContable: record.cuentaContable,
        saldoInicial: record.saldoInicial,
        cargos: record.cargos,
        abonos: record.abonos,
        saldoFinal: record.saldoFinal
      })
        .then(function (res) {
          res.json(res);
        })
        .catch(function (err) {
          res.send(err);
        });

    })

});

module.exports = router;
