const teacher = require("../models/teacher");

const date = require("../../lib/utils").date;
const getAge = require("../../lib/utils").getAge;
const getArray = require("../../lib/utils").getArray;
const getSince = require("../../lib/utils").getSince;

module.exports = {
  index(req, res) {
    const { filter } = req.query;

    if (filter) {
      teacher.findBy(filter, (teachers) => {
        return res.render("teachers/teachers", { teachers });
      });
    } else {
      teacher.all((teachers) => {
        return res.render("teachers/teachers", { teachers });
      });
    }
  },

  post(req, res) {
    const keys = Object.keys(req.body);

    //validation
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Fill all the fields");
      }

      teacher.create(req.body, (id) => {
        return res.redirect(`/teacher/${id}`);
      });
    }
  },

  show(req, res) {
    teacher.find(req.params.id, (teacher) => {
      const foundTeacher = {
        ...teacher,
        age: getAge(teacher.birth_date),
      };

      return res.render("teachers/teacher", { teacher: foundTeacher });
    });
  },

  edit(req, res) {
    teacher.find(req.params.id, (teacher) => {
      const foundTeacher = {
        ...teacher,
        birth_date: date(teacher.birth_date),
      };

      return res.render("teachers/edit", { teacher: foundTeacher });
    });
  },

  put(req, res) {
    teacher.update(req.body, () => {
      return res.redirect(`teacher/${req.body.id}`);
    });
  },

  delete(req, res) {
    teacher.delete(req.body.id, () => {
      return res.redirect("/teachers");
    });
  },
};
