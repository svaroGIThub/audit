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

  const file = req.file.buffer;
  fs.writeFile("uploads/" + req.file.originalname, file, function (error) {
    if (error) {
      res.json(error);
    }
    res.send("Se guardó el archivo.");
  });

  fs.createReadStream("uploads/" + req.file.originalname)
    .pipe(csvParse({ auto_parse: true }))
    .pipe(through2.obj(function (chunk, encoding, addRow) {

      model.Balanza.create({
        auditId: req.body.auditId,
        mes: chunk[0],
        rubro: chunk[1],
        clasificación: chunk[2],
        cuentaMayor: chunk[3],
        subCuenta: chunk[4],
        cuentaContable: chunk[5],
        saldoInicial: parseFloat(chunk[6]),
        cargos: parseFloat(chunk[7]),
        abonos: parseFloat(chunk[8]),
        saldoFinal: parseFloat(chunk[9])
      })
      // .then(function (res) {
      //   res.json(res);
      // })
      // .catch(function (err) {
      //   res.send(err);
      // });


      // let arr = [];

      // arr.push({
      //   mes: chunk[0],
      //   rubro: chunk[1],
      //   clasificación: chunk[2],
      //   cuentaMayor: chunk[3],
      //   subCuenta: chunk[4],
      //   cuentaContable: chunk[5],
      //   saldoInicial: chunk[6],
      //   cargos: chunk[7],
      //   abonos: chunk[8],
      //   saldoFinal: chunk[9]
      // })

      // // console.log("nuevo ARRRRRRRRRRR");
      // // console.log(arr);

      // // replacing commas
      // let saldoInicial = arr[0].saldoInicial;
      // saldoInicial = saldoInicial.replace(/[^\d\.\-]/g, "");
      // arr[0].saldoInicial = saldoInicial;

      // let cargos = arr[0].cargos;
      // cargos = cargos.replace(/[^\d\.\-]/g, "");
      // arr[0].cargos = cargos;

      // let abonos = arr[0].abonos;
      // abonos = abonos.replace(/[^\d\.\-]/g, "");
      // arr[0].abonos = abonos;

      // let saldoFinal = arr[0].saldoFinal;
      // saldoFinal = saldoFinal.replace(/[^\d\.\-]/g, "");
      // arr[0].saldoFinal = saldoFinal;

      // model.Balanza.create({
      //   auditId: req.body.auditId,
      //   mes: arr[0].mes,
      //   rubro: arr[0].rubro,
      //   clasificación: arr[0].clasificación,
      //   cuentaMayor: arr[0].cuentaMayor,
      //   subCuenta: arr[0].subCuenta,
      //   cuentaContable: arr[0].cuentaContable,
      //   saldoInicial: parseFloat(arr[0].saldoInicial),
      //   cargos: parseFloat(arr[0].cargos),
      //   abonos: parseFloat(arr[0].abonos),
      //   saldoFinal: parseFloat(arr[0].saldoFinal)
      // })
      // // .then(function (res) {
      // //   res.json(res);
      // // })
      // .catch(function (err) {
      //   res.send(err);
      // });

      // callback()
    }))
    .on("data", function (record) {

      // console.log(record);

      // // console.log(JSON.stringify(record, null, 4))
      // model.Balanza.create({
      //   auditId: req.body.auditId,
      //   mes: record.mes,
      //   rubro: record.rubro,
      //   clasificación: record.clasificación,
      //   cuentaMayor: record.cuentaMayor,
      //   subCuenta: record.subCuenta,
      //   cuentaContable: record.cuentaContable,
      //   saldoInicial: record.saldoInicial,
      //   cargos: record.cargos,
      //   abonos: record.abonos,
      //   saldoFinal: record.saldoFinal
      // })
      //   .then(function (res) {
      //     res.json(res);
      //   })
      //   .catch(function (err) {
      //     res.send(err);
      //   });

    });



});

module.exports = router;
