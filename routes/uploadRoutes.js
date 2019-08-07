const router = require("express").Router();
// const model = require("../models");

// upload a balanza to the db
// matches with /api/upload/balanza
router.post("/balanza", function (req, res) {

  console.log("printing body: ");
  console.log(req.body);

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
