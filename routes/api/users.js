const router = require("express").Router();
const db = require("../models");
const passport = require("../config/passport");
const userController = require("../../controllers/userController");

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.route("/api/login", passport.authenticate("local"))
  .post(userController.loginuser);

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.route("/api/signup")
  .post(userController.signup);

// Route for logging user out
router.route("/logout")
  .get(userController.logout);

// Route for getting some data about our user to be used client side
router.route("/api/user_data")
  .get(userController.userdata);

module.exports = router;