const express = require("express");
const routes = express.Router();
const ProductsController = require("./app/controllers/ProductsController")


//layout
routes.get("/", function(req, res) {
  return res.render("layout");
});

routes.get("/products/create", ProductsController.create);
routes.get("/products/:id/edit", ProductsController.edit);
routes.post("/products", ProductsController.post)
routes.put("/products", ProductsController.put)
routes.delete("/products", ProductsController.delete)


// Alias
routes.get("/ads/create", function(req, res) { 
  return res.redirect("/products/create");
});

module.exports = routes;   