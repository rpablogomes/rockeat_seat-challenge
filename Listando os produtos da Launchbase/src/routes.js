const express = require("express");
const routes = express.Router();
const multer = require("./app/middleware/multer");

const ProductsController = require("./app/controllers/ProductsController")
const HomeController = require("./app/controllers/HomeController")
const SearchController = require("./app/controllers/SearchController")

// Home
routes.get("/", HomeController.index)

//search
routes.get("/products/search", SearchController.index)

// Products
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