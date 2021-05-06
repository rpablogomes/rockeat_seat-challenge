const { formatPrice, date } = require("../../lib/utils");

const Product = require("../models/Product");
const File = require("../models/File");

module.exports = {
    async index(req, res) {
        let results = await Product.all()
        const products = results.rows

        if(!products) return res.send("Products not found!")

        const productsPromise = products.map(async product => {
             
        }).filter((product, index) => index > 2 ? false : true)

        const lastAdded = await Promise.all(productsPromise)

        return res.render("home/index", { products: lastAdded})
    }
}