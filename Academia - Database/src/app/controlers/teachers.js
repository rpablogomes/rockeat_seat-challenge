const teacher = require("../models/teacher");
const date = require("../../lib/utils").date;
const getAge = require("../../lib/utils").getAge;

module.exports = {
  index(req, res) {
    let { filter, page, limit, selectedPage } = req.query;

    filter = filter || "";
    page = page || 1;
    limit = limit || 3;
    offset = (page - 1) * limit;

    teacher.paginate({ filter, page, limit, offset }, (teachers) => {
      if (!teachers) return res.send("Not found");

      let pagination = teachers[0].pagination
      let totalPage = Math.ceil(pagination / limit)

      return res.render("teachers/teachers", {
        teachers,
        totalPage,
        page,
        filter
      });
    });
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
