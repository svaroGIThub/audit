const router = require("express").Router();
const model = require("../models");

// get all clients
// matches with /api/client/all
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

// add a new client to the db
// matches with /api/client/new
router.post("/new", function (req, res) {
  model.Client.create({
    name: req.body.name,
    acronym: req.body.acronym,
    rfc: req.body.rfc,
    address: req.body.address
  })
    .then(function (res) {
      res.json(res);
    })
    .catch(function (err) {
      res.send(err);
    });
});

// get client info from a given id
// matches with /api/client/:id
router.get("/:id", function (req, res) {
  model.Client.findOne({
    where: { id: req.params.id }
  })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.send(err);
    });
});

// update a client
// matches with /api/client/edit
router.put("/edit/", function (req, res) {
  model.Client.update({
    name: req.body.name,
    acronym: req.body.acronym,
    rfc: req.body.rfc,
    address: req.body.address
  },
    {
      where: { id: req.body.id }
    })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.send(err);
    });
});

module.exports = router;
