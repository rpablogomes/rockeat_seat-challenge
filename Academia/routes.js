const express = require("express");
const routes = express.Router();

const teachers = require("./teacher");
// const { Router } = require("express");

routes.get("/", function (req, res) {
  return res.render("layout");
});

routes.get("/teacher", function (req, res) {
  return res.render("teacher");
});

routes.get("/teacher/register", function (req, res) {
  return res.render("register");
});

routes.post("/teacher", teachers.post);

module.exports = routes;
