const db = require("../../config/db");

module.exports = {

  paginate(req, callback) {
    let { filter, limit, offset } = req;

    query = `SELECT recipes.id, recipes.name, recipes.avatar_url, recipes.subjects_taught, COUNT(students) AS total_students,
    (SELECT COUNT(*) FROM recipes
 
    WHERE chefs.name ILIKE '%${filter}%' AS pagination
        
    FROM chefs
    
    LEFT JOIN students ON (students.chef_id = chefs.id)`;

    if (filter)
      query += `
      WHERE chefs.name ILIKE '%${filter}%'
      
      GROUP BY chefs.id
      
      LIMIT ${limit} OFFSET ${offset}`;
    else
      query += `GROUP BY chefs.id
      
      LIMIT ${limit} OFFSET ${offset}`;

    db.query(query, function (err, results) {
      if (err) throw "Database";

      callback(results.rows);
    });
  },
  chefsList(chefsList){
    db.query('SELECT id, name FROM chefs'
      , function (err, results) {
        console.log(results.rows)
        chefsList(results.rows)
      })
  },
  findBy(filter, callback) {
    db.query(
      `SELECT chefs.id, chefs.name, chefs.avatar_url, chefs.subjects_taught, COUNT(students) AS total_students
        
        FROM chefs
        
        LEFT JOIN students ON (students.chef_id = chefs.id)
        
        WHERE chefs.name ILIKE '%${filter}%'
        
        GROUP BY chefs.id
        
        ORDER BY chefs.id ASC`,

      function (err, results) {
        if (err) return (res.send = "Database error!!!");

        callback(results.rows);
      }
    );
  },
  create(values, callback) {
    // Construct Object to Push to front-end

    const query = `
    INSERT INTO recipes (
      chef_id,
      image,
      title,
      ingredients,
      preparation,
      information,
      created_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
`;


      console.log(values)
      
    db.query(query, values, (err, results) => {
      if(err) throw err
      callback(results.rows[0].id);
    });
  },
  find(id, callback) {
    console.log(id)
    db.query(`SELECT * FROM recipes
    WHERE id = ${id}`, function (
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
  delete(id, callback) {
    db.query(`DELETE FROM chefs WHERE id = ${id}`, (err, results) => {
      if (err) return res.send("Database Error!");

      callback();
    });
  },
};