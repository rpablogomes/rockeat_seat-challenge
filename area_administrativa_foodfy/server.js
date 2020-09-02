const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const data = require("./data")
const recipes = require("./recipes")
const e = require("express")

server.use(express.static("public"))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, function () {
    console.log("Server is running!")
})

// routes

server.get("/", function (req, res) {
    return res.render("index", { foods : data })
})

server.get("/about", function (req, res) {
    return res.render("about")
})

server.get("/receipts", function (req, res) {
    return res.render("receipts", { foods: data })
})

server.get("/receipts/:index", function (req, res) {
    // const recipes = req.params.; // Array de receitas carregadas do data.js
    const recipeIndex = req.params.index;

    if (recipeIndex < data.length) {
        res.render("receipt", {receipt : data[`${recipeIndex}`]});
    } else {
        res.render("not-found")
      }
})

//ADMIN

server.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
server.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
server.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
server.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

server.post("/admin/recipes", recipes.post); // Cadastrar nova receita
server.put("/admin/recipes", recipes.put); // Editar uma receita
server.delete("/admin/recipes", recipes.delete); // Deletar uma receita

server.use(function (req, res) {
    res.status(404).render("not-found");
})