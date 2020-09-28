const db = require("../../config/db")

module.exports = {
    all(callback) {
        db.query(
            'SELECT * FROM students ORDER BY students ASC'
            , function (err, results) {
                if (err) return res.send = ("Database error!!!")

                callback(results.rows)
            }
        )
    },
    selectTeacher(callback){
        db.query('SELECT name, id FROM teachers ORDER BY name ASC', function (err, results){
            callback(results.rows)
        })
    },

    create(data, callback) {

        // Construct Object to Push to Back-end
        let { avatar_url, name, email, birth_date, school_year, workload } = data;

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
            if (err) res.send("Database error!!!")

            callback(results.rows[0])
        })
    },
    find(id, callback) {

        db.query(`SELECT * FROM students WHERE id = ${id}`, function (err, results) {
            if (results.rows == [] || err) throw "Database error!!!"

            return callback(results.rows[0]);
        })
    },
    update(data, callback) {

        let { id, avatar_url, name, email, birth_date, school_year, workload } = data

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

        db.query(query, values, (err, results) => {

            if (err) return res.send("Database Error!")

            callback()
        })
    },
    delete(id, callback) {

        db.query(`DELETE FROM students WHERE id = ${id}`, (err, results) => {

            if (err) return res.send("Database Error!")

            callback()
        })
    }
}