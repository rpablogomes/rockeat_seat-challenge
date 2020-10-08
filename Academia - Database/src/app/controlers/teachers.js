const teacher = require("../models/teacher");

const date = require("../../lib/utils").date;
const getAge = require("../../lib/utils").getAge;
const getArray = require("../../lib/utils").getArray;
const getSince = require("../../lib/utils").getSince;

module.exports = {
  index(req, res) {
    let { filter, page, limit, selectedPage } = req.query;

    pagination = teacher.count(filter, (callback) => {
       return Math.ceil(Number(callback.count) / 3)
    });

    page = page || 1;
    limit = limit || 3;
    let offset = (page - 1) * limit;
    
    teacher.paginate({ filter, page, limit, offset }, function (teachers) {
      if (!teachers) return res.send("Not found");
      
      console.log(pagination)
      return res.render("teachers/teachers",  {teachers , pagination, page});
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
