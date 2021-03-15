const db = require("../../config/db");
const fs = require("fs");

module.exports = {
  async createFile(file, recipeID) {

      const values = [file.filename, file.path];

      const query = `
      INSERT INTO files (
        name,
        path
      )
      VALUES ($1, $2)
      RETURNING id
  `;

  await db.query(query, values, (err, results) => {
    if(err) throw err
     console.log(results.rows)
  });

  return 
  },
  async delete(id) {
    try {
      const results = await db.query(`SELECT * FROM files WHERE id= $1`, [id]);
      const file = results.rows[0];

      fs.unlink(file.path, (err) => {
        if (err) throw err;
        return db.query(`DELETE FROM files WHERE id = $1`, [id]);
      });
    } catch (err) {
      console.log(err);
    }
  },
};
