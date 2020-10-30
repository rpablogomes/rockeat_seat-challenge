const db = require("../../config/db");

module.exports = {

  index(callback) {

    query = `SELECT recipes.id, image, title, chefs.name as chef_name 

    FROM recipes
                
    LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
    
    ORDER BY chefs ASC
    `

    db.query(query, function (err, results) {

      if (err) throw "Database";

      callback(results.rows);
    });
  },
  chefsList(chefsList){
    db.query('SELECT id, name FROM chefs'
      , function (err, results) {
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
      
    db.query(query, values, (err, results) => {
      if(err) throw err
      callback(results.rows[0].id);
    });
  },
  find(id, callback) {
    db.query(`
    SELECT * FROM recipes
    
    WHERE id = ${id}`, 
    (err, results) => {
      if (results.rows == [] || err) throw "Database error!!!"
      callback(results.rows[0]);
    });
  },
  update(editedRecipe, callback) {

    const query = `UPDATE recipes SET
            chef_id=($1),
            image=($2),
            title=($3),
            ingredients=($4),
            preparation=($5),
            information=($6)
      WHERE id = $7`;

    db.query(query, editedRecipe, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },
  delete(id, callback) {
    db.query(`DELETE FROM recipes WHERE id = ${id}`, (err, results) => {
      if (err) throw "Database Error!";

      callback();
    });
  },
};