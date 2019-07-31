var model = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // get info from the logged user
  app.get("/api/user/:uid", function(req, res) {
    model.User.findOne({
      where: { uid: req.params.uid }
    }).then(function(data) {
      res.json(data);
    });
  });
};
