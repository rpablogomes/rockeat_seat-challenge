const db = require("../../config/db")
const date = require("../../lib/utils").date;

const getAge = require("../../lib/utils").getAge;
const getArray = require("../../lib/utils").getArray;
const getSince = require("../../lib/utils").getSince;

module.exports = {
    all(callback) {
        db.query('SELECT * FROM teachers', function (err, results) {

            if (err) return res.send = ("Database error!!!")

            callback(results.rows)
        }
        )
    },
    create(data, callback) {

        console.log(data, "ok")

        // Construct Object to Push to front-end
        let { avatar_url, name, birth_date, education_level, class_type, subjects_taught } = data;

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

        db.query(query, values, (err, results) => {
            if (err) res.send("Database error!!!")

            callback()
        })
    },
    find(id, callback) {

        db.query(`SELECT * FROM teachers WHERE id = ${id}`, function (err, results) {
            if (results.rows == [] || err) return res.send("Database error!!!")

            callback(results.rows[0]);
        })
    },
    update(data, callback) {

        let { id, avatar_url, name, birth_date, education_level, class_type, subjects_taught } = data

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

        db.query(query, values, (err, results) => {
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },
    delete(id, callback) {

        db.query(`DELETE FROM teachers WHERE id = ${id}`, (err, results) => {

            if (err) return res.send("Database Error!")

            callback()
        })
    }
}