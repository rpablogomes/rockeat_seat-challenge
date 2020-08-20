const fs = require("fs");
const data = require("./data.json");
const { timeStamp } = require("console");
const getAge = require("./utils").age;

//post
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  //validation
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Fill all the fields");
    }
  }

  //
  //id
  const id = data.teachers.length + 1;

  const {
    avatar_url,
    name,
    birthday,
    degree,
    type_of_class,
    classes,
  } = req.body;

  data.teachers.push({
    id,
    avatar_url,
    name,
    birthday,
    degree,
    type_of_class,
    classes,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write file error");

    return res.redirect("/teacher");
  });
};

exports.show = function (req, res) {
  //validation
  const idToCheck = req.params.id;
  const foundTeacher = data.teachers.find((teacher) => {
    return teacher.id == idToCheck;
  });

  if (!foundTeacher) {
    return res.send("Not found");
  }

  //Object to send to front-end

  // Creating age based on birthday

  const {
    id,
    avatar_url,
    name,
    degree,
    birthday,
    type_of_class,
    classes,
  } = foundTeacher;

  const age = getAge(birthday);

  const teacherToShow = {
    id,
    avatar_url,
    name,
    age,
    degree,
    type_of_class,
    classes,
  };

  console.log(teacherToShow);
  return res.render("teacher", { teacherToShow });
};
