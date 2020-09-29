const db = require("../../config/db")

module.exports = {
    all(callback) {
        db.query(
            `SELECT students.id, students.avatar_url, students.name, students.email,  students.school_year, teachers.name as teacher_name 
            
            FROM students
            
            LEFT JOIN teachers ON (students.teacher_id = teachers.id)
            
            ORDER BY students ASC`
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

        // if(teachers){
        //     db.query("SELECT name, id FROM teachers ORDER BY name ASC",(err, results) => {
        //         teachers(results.rows)

        //     })
        // }

        db.query(`
        SELECT students.id, students.avatar_url, students.name, students.birth_date, students.email, students.teacher_id, students.school_year, students.workload, teachers.name AS teacher_name

        FROM students
        
        LEFT JOIN teachers ON (teachers.id = students.teacher_id)
      
      	WHERE students.id = ${id}`, (err, results) => {

            if (results.rows == [] || err) throw "Database error!!!"

            callback(results.rows[0]);
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