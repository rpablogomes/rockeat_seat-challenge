const express = require("express");
const routes = express.Router();
const multer = require("./app/middleware/multer");
const ProductsController = require("./app/controllers/ProductsController")

//layout
routes.get("/", function(req, res) {
  return res.render("layout");
});

routes.get("/products/create", ProductsController.create);
routes.get("/products/:id", ProductsController.show);
routes.get("/products/:id/edit", ProductsController.edit);
routes.post("/products", multer.array("photos", 6), ProductsController.post)
routes.put("/products", multer.array("photos", 6),  ProductsController.put)
routes.delete("/products", ProductsController.delete)

// Alias
routes.get("/ads/create", function(req, res) { 
  return res.redirect("/products/create");
});

module.exports = routes;