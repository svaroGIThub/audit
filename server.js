const express = require("express");
const app = express();
// const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT || 3001;
const models = require("./models");
const path = require("path");
const sequelize_fixtures = require("sequelize-fixtures");

// middleware
app.use(morgan("dev"));
// app.use(cors());

// parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// API routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);
const auditRoutes = require("./routes/auditRoutes");
app.use("/api/audit", auditRoutes);
const clientRoutes = require("./routes/clientRoutes");
app.use("/api/client", clientRoutes);
const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api/upload", uploadRoutes);
const surveyRoutes = require("./routes/surveyRoutes");
app.use("/api/survey", surveyRoutes);

// send every other request to the React app
// define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// sync db
// when in dev force: true
// when in prod force: false
models.sequelize.sync({ force: false }).then(function() {
  // load fixtures files into the db
  // it's important that the process is finished in order
  sequelize_fixtures.loadFile("fixtures/*.json", models).then(function() {
    console.log("dev data loaded successfully");
  });

  // start server
  app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});
