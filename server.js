// Define middleware
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add all API routes
const allBackendRoutes = require("./routes");
app.use(allBackendRoutes);

// Send every other request to the React app
// Define any API routes before this runs
const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Run the server
const PORT = process.env.PORT || 3001;
const db = require("./models");
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("🌎 ==> API server now on port " + PORT);
  });
});
