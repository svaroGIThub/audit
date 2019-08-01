const router = require("express").Router();
const model = require("../models");

// get user info
router.get("/:uid", function (req, res) {
  model.User.findOne({
    where: { uid: req.params.uid }
  })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (res) {
      res.send(res);
    });
});

module.exports = router;