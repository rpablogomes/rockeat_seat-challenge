const student = require("../models/student");
const Student = require("../models/student");
const date = require("../../lib/utils").date;
const getAge = require("../../lib/utils").getAge;

module.exports = {
  index(req, res) {
    let { page, limit, selectedPage } = req.query;

    student.count(callback => {
      pagination = Math.ceil(callback.count / 3)
    })

    page = page || 1;
    limit = limit || 3;
    let offset = (page - 1) * limit;

    student.paginate({ page, limit, offset }, function (students) {
      if (!students) return res.send("Not found");

      return res.render("students/students",  {students , pagination, page});
    });
  },

  selectTeacher(req, res) {
    Student.selectTeacher(teachers => {
      return res.render("students/register", { teachers });
    });
  },

  create(req, res) {
    const keys = Object.keys(req.body);

    //validation
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Fill all the fields");
      }
    }

    Student.create(req.body, (student) => {
      res.redirect(`/student/${student.id}`);
    });
  },

  show(req, res) {
    //validation
    Student.find(req.params.id, (student) => {
      const foundStudent = {
        ...student.student,
        age: getAge(student.student.birth_date),
      };

      return res.render("students/student", { student: foundStudent });
    });
  },

  edit(req, res) {
    Student.find(req.params.id, (callback) => {

        console.log(callback);

      const foundStudent = {
        ...callback.student,
        birth_date: date(callback.student.birth_date),
      };

      return res.render(
        "students/edit", { student: foundStudent, teachers: callback.teachers }
      )
    });
  },

  put(req, res) {
    console.log(req.body);

    Student.update(req.body, () => {
      return res.redirect(`student/${req.body.id}`);
    });
  },

  delete(req, res) {
    const { id } = req.body;

    Student.delete(id, () => {
      return res.redirect("/students");
    });
  },
};
