const getAge = require("../../lib/utils").getAge;
const getArray = require("../../lib/utils").getArray;
const getSince = require("../../lib/utils").getSince;
const date = require("../../lib/utils").date;
const db = require("../../config/db")

//students' list
exports.students = function (req, res) {

  db.query('SELECT * FROM students', function (err, results) {

    if (err) return res.send = ("Database error!!!")

    return res.render("students/students", { students: results.rows });
  });
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

  // Construct Object to Push to front-end
  let { avatar_url, name, email, birth_date, school_year, workload } = req.body;

  // const subjectsInArray = getArray(subjects_taught)
  const birthday = date(birth_date);

  console.log(birthday)

  const query = `
      INSERT INTO students (
        avatar_url,
        name,
        email,
        birth_date,
        school_year,
        workload
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
  `

  const values = [
    avatar_url,
    name,
    email,
    birth_date,
    school_year,
    workload
  ]

  console.log(values)

  db.query(query, values, function (err, results) {
    console.log(err)
    if (err) res.send("Database error!!!")
    return res.redirect(`/student/${results.rows[0].id}`);
  })
};


exports.show = function (req, res) {
  //validation
  const idToCheck = req.params.id;


  db.query(`SELECT * FROM students WHERE id= ${idToCheck}`, function (err, results) {
    if (results.rows == []) return res.send("Database error!!!")

    const {
      id,
      avatar_url,
      name,
      email,
      birth_date,
      school_year,
      workload
    } = results.rows[0]

    const student = {
      id,
      avatar_url,
      name,
      email,
      age: getAge(birth_date),
      school_year,
      workload
    }

    return res.render("students/student", { student });
  })
};

exports.edit = function (req, res) {

  const idToCheck = req.params.id;

  db.query(`SELECT * FROM students WHERE id= ${idToCheck}`, function (err, results) {

    let birth_date = date(results.rows[0].birth_date).iso

    const foundstudent = {
      id,
      avatar_url,
      name,
      email,
      birth_date,
      school_year,
      workload
    } = results.rows[0]

    const student = {
      ...foundstudent,
      birth_date: date(birth_date)
    }

    return res.render("students/edit", { student });
  })

};

exports.put = function (req, res) {
  let { id, avatar_url, name, email, birth_date, school_year, workload } = req.body

  const query =
    `UPDATE students SET
    avatar_url=($1),
    name=($2),
    email=($3),
    birth_date=($4),
    school_year=($5),
    workload=($6)
  WHERE id = $7`

  const values = [
    avatar_url,
    name,
    email,
    birth_date,
    school_year,
    workload,
    id
  ]

  db.query(query, values, function (err, results) {

    if (err) return res.send("Database Error!")

    return res.redirect(`student/${id}`);
  })
};

exports.delete = function (req, res) {
  const { id } = req.body;
  db.query(`DELETE FROM students WHERE id = ${id}`)

  return res.redirect("/students");
};