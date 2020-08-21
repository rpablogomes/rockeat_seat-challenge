const fs = require("fs");
const data = require("./data.json");
const { timeStamp } = require("console");
const getAge = require("./utils").getAge;
const getClasses = require("./utils").getClasses;
const getSince = require("./utils").getSince

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
    since
  } = foundTeacher;
  
  const age = getAge(birthday);
  let newClasses = getClasses(classes)
  let newSince = getSince(since);

  
  //Object to send to front-end
  const teacherToShow = {
    id,
    avatar_url,
    name,
    age,
    degree,
    type_of_class,
    classes: newClasses,
    since: newSince
  };

  console.log(teacherToShow);
  return res.render("teacher", { teacherToShow });
};

exports.edit = function (req, res) {
  const teacherToEdit = {
    "id": 1,
    "avatar_url": "https://upload.wikimedia.org/wikipedia/commons/8/82/Zinedine_Zidane_by_Tasnim_01.jpg",
    "name": "Zinedine Zidane",
    "birthday": 78105600000,
    "degree": "undergraduaded",
    "type_of_class": "presential",
    "classes": "Soccer, strategy, leadership",
    "since": 1598029804080
  }
  return res.render ("edit", { teacherToEdit })
}
