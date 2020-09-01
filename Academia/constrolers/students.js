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
  students = [];

  for (let i of data.students) {
    let { id, avatar_url, name, email, school_year } = i;

    const studentToPush = {
      id,
      avatar_url,
      email,
      school_year
    };

    students.push(studentToPush);
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
  let { avatar_url, name, email, school_year, workload } = req.body;

  const CheckHighestid = () => {
    let highestID = 0;
    for (let e of data.students) {
      if (e.id > highestID) {
        highestID = e.id;
      }
    }
    return highestID + 1;
  };

  const id = Number(CheckHighestid());

  console.log(id);

  const birthday = Date.parse(req.body.birthday);

  data.students.push({
    id,
    avatar_url,
    name,
    email,
    birthday,
    school_year,
    workload,
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
  const foundStudent = data.students.find((student) => {
    return student.id == idToCheck;
  });

  if (!foundStudent) {
    return res.send("Not found");
  }

  // Creating age based on birthday

  let {
    id,
    avatar_url,
    name,
    email,
    birthday,
    school_year,
    workload,
  } = foundStudent;

  const age = getAge(birthday);

  //Object to send to front-end
  const student = {
    id,
    avatar_url,
    name,
    age,
    email,
    school_year,
    workload,
  };

  return res.render("students/student", { student });
};

exports.edit = function (req, res) {
  const idToCheck = req.params.id;

  const foundStudent = data.students.find((student) => {
    return student.id == idToCheck;
  });

  let { id, avatar_url, name, email, school_year, workload } = foundStudent;

  const birthday = date(foundStudent.birthday);

  const student = {
    id,
    avatar_url,
    name,
    birthday,
    email,
    school_year,
    workload,
  };

  return res.render("students/edit", { student });
};

exports.put = function (req, res) {
  const { id, name, degree, type_of_class, classes, since } = req.body;
  const birthday = Date.parse(req.body.birthday);

  let index = 0;

  const foundStudent = data.students.find((student, foundIndex) => {
    index = foundIndex;
    return student.id == id;
  });

  if (!foundStudent) {
    return res.send("Not found");
  }

  const student = {
    ...foundStudent,
    ...req.body,
    birthday,
  };

  data.students[index] = student;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write file error");
  });

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
