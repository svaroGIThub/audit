const path = require("path");
const router = require("express").Router();
const beapi_user = require("./beapi_user");

// API Routes
router(beapi_user);
// router.use("/api", allBackendRoutes);

// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;