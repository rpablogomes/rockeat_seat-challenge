const express = require("express");
const routes = express.Router();
const teachers = require("./teacher");
// const { Router } = require("express");

routes.get("/", function (req, res) {
  return res.render("layout");
});

routes.get("/teacher-register", function (req, res) {
  return res.render("register");
});

routes.get("/teacher/:id", teachers.show);

routes.get("/teacher-edit/:id", teachers.edit)

routes.post("/teacher", teachers.post);

module.exports = routes;
