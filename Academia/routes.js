const express = require("express");
const routes = express.Router();
const teachers = require("./teacher");
// const { Router } = require("express");

//layout
routes.get("/", function (req, res) {
  return res.render("layout");
});

//Teachers' list
routes.get("/teachers", teachers.teachers)

//Register Page
routes.get("/teacher/register", function (req, res) {
  return res.render("register");
});

//post
routes.post("/teacher", teachers.post);

//show
routes.get("/teacher/:id", teachers.show);

//edit
routes.get("/teacher/:id/edit", teachers.edit)

//put
routes.put("/teacher", teachers.put)

//delete
routes.delete("/teacher", teachers.delete)

module.exports = routes;