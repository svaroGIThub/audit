// const router = require("express").Router();
// const userController = require("../../controllers/userController");

// router.route("/api/user" + )
//   .get(userController.userdata);

// module.exports = router;

const model = require("../../models");

module.exports = function (app) {

  // get data from the logged user
  app.get("/api/user/:uid", function (req, res) {
    model.User.findOne({
      where: { uid: req.params.uid }
    }).then(function (data) {
      res.json(data);
    })
  });

}