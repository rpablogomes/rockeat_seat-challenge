const db = require("../../config/db")

module.exports = {
    All(){
        return db.query("SELECT * FROM categories")
    }
}