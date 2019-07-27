const router = require("express").Router();
const passport = require("../../config/passport");
const userController = require("../../controllers/userController");

router.route("/api/login", passport.authenticate("local"))
  .post(userController.loginuser);

router.route("/api/signup")
  .post(userController.signup);

router.route("/logout")
  .get(userController.logout);

router.route("/api/user_data")
  .get(userController.userdata);

module.exports = router;