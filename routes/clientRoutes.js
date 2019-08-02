const router = require("express").Router();
const model = require("../models");

// get all clients
// matches with /api/client/:cid
router.get("/all", function (req, res) {
  model.Client.findAll({
    order: ["name"]
  }).then(function (data) {
    res.json(data);
  })
    .catch(function (err) {
      res.send(err);
    });
});

module.exports = router;
