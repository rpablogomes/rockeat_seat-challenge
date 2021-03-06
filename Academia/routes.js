const express = require("express");
const routes = express.Router();
const teachers = require("./controlers/teacher");
const students = require("./controlers/students");

// const { Router } = require("express");

//layout
routes.get("/", function (req, res) {
  return res.render("layout");
});

//Teachers' list
routes.get("/teachers", teachers.teachers)

//Register Page
routes.get("/teacher/register", function (req, res) {
  return res.render("teachers/register");
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

//STUDENTS

//students' list
routes.get("/students", students.students)

//Register Page
routes.get("/student/register", function (req, res) {
  return res.render("students/register");
});

//post
routes.post("/student", students.post);

//show
routes.get("/student/:id", students.show);

//edit
routes.get("/student/:id/edit", students.edit)

//put
routes.put("/student", students.put)

//delete
routes.delete("/student", students.delete)

module.exports = routes;