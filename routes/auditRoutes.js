const router = require("express").Router();
const model = require("../models");

// get user info
router.get("/all", function(req, res) {
  model.Audit.findAll({
    order: ["clientName"]
  }).then(function(data) {
    res.json(data);
  });
});

module.exports = router;
