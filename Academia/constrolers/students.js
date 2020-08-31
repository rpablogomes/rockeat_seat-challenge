const fs = require("fs");
const data = require("../data.json");
const { timeStamp } = require("console");
const { render } = require("nunjucks");
const getAge = require("../utils").getAge;
const getClasses = require("../utils").getClasses;
const getSince = require("../utils").getSince;
const date = require("../utils").date;

//students' list

exports.students = function (req, res) {

  students = []
  
  
  for(let i of data.students){

    let { id, avatar_url, name, classes } = i
    
    let classesInArray = getClasses(classes)

    const studentToPush = {
      id, avatar_url, name, classes : classesInArray
    }

    students.push(studentToPush)

  }
  return res.render("students/students", { students });
};

//post
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  //validation
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Fill all the fields");
    }
  }
  // Construct Object to Push into data
  let { avatar_url, name, degree, type_of_class, classes } = req.body;

  const id = data.students.length + 1;
  const since = Date.now();
  const birthday = Date.parse(req.body.birthday);

  data.students.push({
    id,
    avatar_url,
    name,
    birthday,
    degree,
    type_of_class,
    classes,
    since,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write file error");

    return res.redirect(`student/${id}`);
  });
};

//Construction
exports.show = function (req, res) {
  //validation
  const idToCheck = req.params.id;
  const foundstudent = data.students.find((student) => {
    return student.id == idToCheck;
  });

  if (!foundstudent) {
    return res.send("Not found");
  }

  // Creating age based on birthday

  let {
    id,
    avatar_url,
    name,
    degree,
    birthday,
    type_of_class,
    classes,
    since,
  } = foundstudent;

  const age = getAge(birthday);
  let newClasses = getClasses(classes);
  let newSince = getSince(since);

  //Object to send to front-end
  const student = {
    id,
    avatar_url,
    name,
    age,
    degree,
    type_of_class,
    classes: newClasses,
    since: newSince,
  };

  return res.render("students/student", { student });
};

exports.edit = function (req, res) {
  const idToCheck = req.params.id;

  const foundstudent = data.students.find((student) => {
    return student.id == idToCheck;
  });

  let { id, avatar_url, name, degree, type_of_class, classes } = foundstudent;

  const birthday = date(foundstudent.birthday);

  const student = {
    id,
    avatar_url,
    name,
    birthday,
    degree,
    type_of_class,
    classes,
  };

  return res.render("students/edit", { student });
};

exports.put = function (req, res) {
  const { id, name, degree, type_of_class, classes, since } = req.body;
  const birthday = Date.parse(req.body.birthday);

  let index = 0;

  const foundstudent = data.students.find((student, foundIndex) => {
    index = foundIndex;
    return student.id == id;
  });

  
  
  if (!foundstudent) {
    return res.send("Not found");
  }
  
  const student = {
    ...foundstudent,
    ...req.body,
    birthday,
  };
  
  data.students[index] = student;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write file error");
  })

  return res.redirect(`/student/${id}`);
};

exports.delete = function (req, res) {
  const { id } = req.body;
  const filteredstudent = data.students.filter((student) => {
    if (student.id != id) {
      return student;
    }
  });
  console.log(filteredstudent);
  data.students = filteredstudent;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Error");
    }

    return res.redirect("/");
  });
};
