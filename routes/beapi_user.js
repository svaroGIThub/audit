const model = require("../models");

// ROUTES
// =============================================================
module.exports = function (app) {
  // get info from the logged user
  app.get("/api/user/:uid", function (req, res) {

    console.log("RETRIEVING INFO FROM THE USER");

    model.User.findOne({
      where: { uid: req.params.uid }
    }).then(function (data) {
      res.json(data);
    });
  });
};
