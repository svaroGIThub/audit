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

// get audit info from a given aid
// matches with /api/audit/:aid
router.get("/:aid", function (req, res) {
  model.Audit.findOne({
    where: { aid: req.params.aid }
  })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.send(err);
    });
});

module.exports = router;
