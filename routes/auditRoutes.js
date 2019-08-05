const router = require("express").Router();
const model = require("../models");

// get all audits
// matches with /api/audit/all
router.get("/all", function(req, res) {
  model.Audit.findAll({
    order: ["clientName"]
  })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    });
});

// get audit info from a given aid
// matches with /api/audit/:aid
router.get("/:aid", function(req, res) {
  model.Audit.findOne({
    where: { aid: req.params.aid }
  })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    });
});

// add a new audit to the db
router.post("/new", function(req, res) {
  console.log("==========CREATING new audit===========");
  console.log(req.body);
  model.Audit.create({
    // aid: req.body.aid,
    clientName: req.body.clientName,
    clientAcronym: req.body.clientAcronym,
    year: req.body.year,
    description: req.body.description
  })
    .then(function(res) {
      res.json(res);
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = router;
