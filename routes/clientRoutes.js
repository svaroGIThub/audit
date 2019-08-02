const router = require("express").Router();
const model = require("../models");

// get user info
router.get("/all", function(req, res) {
  model.Client.findAll({
    order: ["name"]
  }).then(function(data) {
    res.json(data);
  });
});

module.exports = router;
