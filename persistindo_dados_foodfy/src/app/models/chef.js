const db = require("../../config/db");

module.exports = {
  index(callback) {

    query = `SELECT chefs.id, chefs.name, chefs.avatar_url, COUNT(chef_id) AS total_recipes

    FROM chefs

    LEFT JOIN recipes ON (chefs.id = recipes.chef_id)

    GROUP BY chefs.id, chefs.name, chefs.avatar_url`;

    db.query(query, function (err, results) {
      if (err) throw "Database";

      callback(results.rows);
    });
  },

  create(data, callback) {
    // Construct Object to Push to front-end

    const values = data

    console.log(values)

    const query = `
        INSERT INTO chefs (
          name,
          avatar_url,
          created_at
        )
        VALUES ($1, $2, $3)
        RETURNING id
    `

    db.query(query, values, function (err, results) {

      console.log(err)

        if (err) throw "Database error!!!"
        callback(results.rows[0])
    })
},

//     const values = [
//       avatar_url,
//       name,
//       date(birth_date),
//       education_level,
//       class_type,
//       getArray(subjects_taught),
//       date(Date.now()),
//     ];

//     db.query(query, values, (err, results) => {
//       if (err) res.send("Database error!!!");

//       callback();
//     });
  find(id, callback){
    db.query(`SELECT * FROM chefs WHERE id = ${id}`, 
    function (err,results) {
      if(results.rows == [] || err) return callback.send("Database error!!!");
      callback(results.rows[0]);
    })
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

    const query = `UPDATE chefs SET
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
//   delete(id, callback) {
//     db.query(`DELETE FROM chefs WHERE id = ${id}`, (err, results) => {
//       if (err) return res.send("Database Error!");

//       callback();
//     });
//   },
}