const fs = require("fs");
const data = require("./data.json");
const { timeStamp } = require("console");
const getAge = require("./utils").getAge;
const getClasses = require("./utils").getClasses;
const getSince = require("./utils").getSince;
const date = require("./utils").date;

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

  const id = data.teachers.length + 1;
  const since = Date.now();
  const birthday = Date.parse(req.body.birthday);

  data.teachers.push({
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

    return res.redirect("/teacher");
  });
};

//Construction
exports.show = function (req, res) {
  //validation
  const idToCheck = req.params.id;
  const foundTeacher = data.teachers.find((teacher) => {
    return teacher.id == idToCheck;
  });

  if (!foundTeacher) {
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
  } = foundTeacher;

  const age = getAge(birthday);
  let newClasses = getClasses(classes);
  let newSince = getSince(since);

  //Object to send to front-end
  const teacher = {
    id,
    avatar_url,
    name,
    age,
    degree,
    type_of_class,
    classes: newClasses,
    since: newSince,
  };

  return res.render("teacher", { teacher });
};

exports.edit = function (req, res) {
  const idToCheck = req.params.id;

  const foundTeacher = data.teachers.find((teacher) => {
    return teacher.id == idToCheck;
  });

  let { id, avatar_url, name, degree, type_of_class, classes } = foundTeacher;

  const birthday = date(foundTeacher.birthday);

  const teacher = {
    id,
    avatar_url,
    name,
    birthday,
    degree,
    type_of_class,
    classes,
  };

  return res.render("edit", { teacher });
};

exports.put = function (req, res) {
  const { id, name, degree, type_of_class, classes, since } = req.body;
  const birthday = Date.parse(req.body.birthday)

  let index = 0

  const foundTeacher = data.teachers.find((teacher, foundIndex) => {
    index = foundIndex
    return teacher.id == id;
  })

  if (!foundTeacher) {
    return res.send("Not found");
  }

  const teacher = {
    ...foundTeacher,
    ...req.body,
    birthday
  }

  data.teachers[index] = teacher

  return res.redirect(`/teacher/${id}`)
};

exports.delete = function(req, res){
  console.log("ok")
}