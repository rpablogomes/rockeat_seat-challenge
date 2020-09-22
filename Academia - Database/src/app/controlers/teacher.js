const getAge = require("../../lib/utils").getAge;
const getArray = require("../../lib/utils").getArray;
const getSince = require("../../lib/utils").getSince;
const date = require("../../lib/utils").date;
const db = require("../../config/db")

//Teachers' list
exports.teachers = function (req, res) {

  db.query('SELECT * FROM teachers', function (err, results) {

    if (err) return res.send = ("Database error!!!")

    return res.render("teachers/teachers", { teachers: results.rows });
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
  let { avatar_url, name, birth_date, education_level, class_type, subjects_taught } = req.body;
  
  // const subjectsInArray = getArray(subjects_taught)
  const birthday = Date.parse(birth_date);

  const query = `
      INSERT INTO teachers (
        avatar_url,
        name,
        birth_date,
        education_level,
        class_type,
        subjects_taught,
        created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
  `

  const values = [
    avatar_url,
    name,
    date(birth_date),
    education_level,
    class_type,
    getArray(subjects_taught),
    date(Date.now())
  ]

  console.log(values)
  db.query(query, values, function (err, results) {
    console.log(results)
    if(err) res.send("Database error!!!")
    return res.redirect(`/teacher/${results.rows[0].id}`);
  })
};


exports.show = function (req, res) {
  //validation
  const idToCheck = req.params.id;

  db.query(`SELECT * FROM teachers WHERE id= ${idToCheck}`, function (err, results) {

    if (err) return res.send = ("Database error!!!")

    const {
      id,
      avatar_url,
      name,
      birth_date,
      education_level,
      class_type,
      subjects_taught,
      created_at
    } = results.rows[0]

    const teacher = {
      id,
      avatar_url,
      name,
      age: getAge(birth_date),
      education_level,
      class_type,
      subjects_taught,
      since: getSince(created_at)
    }

    console.log(teacher)


    return res.render("teachers/teacher", { teacher });
  })
};

exports.edit = function (req, res) {

  const idToCheck = req.params.id;

  db.query(`SELECT * FROM teachers WHERE id= ${idToCheck}`, function (err, results) {

    let birth_date = date(results.rows[0].birth_date)

    const foundTeacher = {
      id,
      avatar_url,
      name,
      education_level,
      class_type,
      subjects_taught
    } = results.rows[0]

    const teacher = {
      ...foundTeacher,
      birth_date
    }

    console.log(teacher)

    return res.render("teachers/edit", { teacher });
  })

};

exports.put = function (req, res) {
  let { id, avatar_url, name, birth_date, education_level, class_type, subjects_taught, created_at } = req.body

  const query = 
  `UPDATE teachers SET
    avatar_url=($1),
    name=($2),
    birth_date=($3),
    education_level=($4),
    class_type=($5),
    subjects_taught=($6)
  WHERE id = $7`

  const values = [
    avatar_url,
    name,
    birth_date,
    education_level,
    class_type,
    getArray(subjects_taught),
    id
  ]
  console.log(values)
  db.query(query, values, function (err, results) {
    console.log(err)
    if (err) return res.send("Database Error!")

    return res.redirect(`teacher/${id}`);
  })

};

exports.delete = function (req, res) {
  const { id } = req.body;
  db.query(`DELETE FROM teachers WHERE id = ${id}`)

  return res.redirect("/teachers");
};
