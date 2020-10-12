const db = require("../../config/db");
const date = require("../../lib/utils").date;
const getArray = require("../../lib/utils").getArray;


module.exports = {

  paginate(req, callback) {
    let { filter, limit, offset } = req;

    query = `SELECT teachers.id, teachers.name, teachers.avatar_url, teachers.subjects_taught, COUNT(students) AS total_students,

    (SELECT COUNT(*) FROM teachers
 
    WHERE teachers.name ILIKE '%${filter}%') AS pagination
        
    FROM teachers
    
    LEFT JOIN students ON (students.teacher_id = teachers.id)`;

    if (filter)
      query += `

      WHERE teachers.name ILIKE '%${filter}%'
      
      GROUP BY teachers.id
      
      LIMIT ${limit} OFFSET ${offset}`;
    else
      query += `GROUP BY teachers.id
      
      LIMIT ${limit} OFFSET ${offset}`;

    db.query(query, function (err, results) {
      if (err) throw "Database";

      callback(results.rows);
    });
  },

  findBy(filter, callback) {
    db.query(
      `SELECT teachers.id, teachers.name, teachers.avatar_url, teachers.subjects_taught, COUNT(students) AS total_students
        
        FROM teachers
        
        LEFT JOIN students ON (students.teacher_id = teachers.id)
        
        WHERE teachers.name ILIKE '%${filter}%'
        
        GROUP BY teachers.id
        
        ORDER BY teachers.id ASC`,

      function (err, results) {
        if (err) return (res.send = "Database error!!!");

        callback(results.rows);
      }
    );
  },
  create(data, callback) {
    // Construct Object to Push to front-end
    let {
      avatar_url,
      name,
      birth_date,
      education_level,
      class_type,
      subjects_taught,
    } = data;

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
  `;

    const values = [
      avatar_url,
      name,
      date(birth_date),
      education_level,
      class_type,
      getArray(subjects_taught),
      date(Date.now()),
    ];

    db.query(query, values, (err, results) => {
      if (err) res.send("Database error!!!");

      callback();
    });
  },
  find(id, callback) {
    db.query(`SELECT * FROM teachers WHERE id = ${id}`, function (
      err,
      results
    ) {
      if (results.rows == [] || err) return res.send("Database error!!!");

      callback(results.rows[0]);
    });
  },
  update(data, callback) {
    let {
      id,
      avatar_url,
      name,
      birth_date,
      education_level,
      class_type,
      subjects_taught,
    } = data;

    const query = `UPDATE teachers SET
            avatar_url=($1),
            name=($2),
            birth_date=($3),
            education_level=($4),
            class_type=($5),
            subjects_taught=($6)
      WHERE id = $7`;

    const values = [
      avatar_url,
      name,
      birth_date,
      education_level,
      class_type,
      getArray(subjects_taught),
      id,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },
  delete(id, callback) {
    db.query(`DELETE FROM teachers WHERE id = ${id}`, (err, results) => {
      if (err) return res.send("Database Error!");

      callback();
    });
  },
};
