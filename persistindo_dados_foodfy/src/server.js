const express = require("express")
const nunjucks = require("nunjucks")
const methodOverride = require("method-override")

const server = express()

const recipes = require("./app/controls/recipes")
const clients = require("./app/controls/clients")
const chefs = require("./app/controls/chefs")

server.use(express.urlencoded({ extended: true }))
server.use(methodOverride('_method'))

server.use(express.static("public"))

server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, function () {
    console.log("Server is running!")
})

// RECIPES Routes

server.get("/", clients.index);
server.get("/about", clients.about);
server.get("/receipts", clients.recipes);
server.get("/receipts/:index", clients.receipt);

//ADMIN Routes

server.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
server.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
server.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
server.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita
server.post("/admin/recipes", recipes.post); // Cadastrar nova receita
server.put("/admin/recipes", recipes.put); // Editar uma receita
server.delete("/admin/recipes", recipes.delete); // Deletar uma receita

//CHEFS routes

server.get("/admin/chefs", chefs.index); // Mostrar a lista de receitas
server.get("/admin/chef/create", chefs.create); // Mostrar formulário de nova receita
server.get("/admin/chef/:id", chefs.show); // Exibir detalhes de uma receita
server.get("/admin/chef/:id/edit", chefs.edit); // Mostrar formulário de edição de receita
server.post("/admin/chef", chefs.post); // Cadastrar nova receita
server.put("/admin/chef", chefs.put); // Editar uma receita
server.delete("/admin/chef", chefs.delete); // Deletar uma receita

// server.use(function(req, res) {
//     res.status(404).render("not-found");
// }) // Work on it this fuction later