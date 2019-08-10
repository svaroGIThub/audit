const router = require("express").Router();
const model = require("../models");

// get all audits
// matches with /api/audit/all
router.get("/all", function (req, res) {
  model.Audit.findAll({
    order: ["clientName"]
  })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.send(err);
    });
});

// get audit info from a given id
// matches with /api/audit/:id
router.get("/:id", function (req, res) {
  model.Audit.findOne({
    where: { id: req.params.id }
  })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.send(err);
    });
});

// add a new audit to the db
// also create blank surveys from that audit
// matches with /api/audits/new
router.post("/new", function (req, res) {
  model.Audit.create({
    clientName: req.body.clientName,
    clientAcronym: req.body.clientAcronym,
    year: req.body.year,
    description: req.body.description
  })
    .then(function (row) {

      // this is the id from the recently created audit
      const newAudit = row.dataValues.id;

      // creating blank cci
      model.Cci.create({
        auditId: newAudit
      })
        .then(function (res) {
          // res.json(res);
        })
        .catch(function (err) {
          res.send(err);
        });

      // creating blank cefs
      model.Cefs.create({
        auditId: newAudit
      })
        .then(function (res) {
          // res.json(res);
        })
        .catch(function (err) {
          res.send(err);
        });

      // response to the frontend
      res.json(res);

    })
    .catch(function (err) {
      res.send(err);
    });
});

module.exports = router;
