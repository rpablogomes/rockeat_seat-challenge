const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const data = require("./data")
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

// server.get("/receipt", function (req, res){
//     return res.render("receipt")
// })

server.get("/receipts/:index", function (req, res) {
    // const recipes = req.params.; // Array de receitas carregadas do data.js
    const recipeIndex = req.params.index;

    if (recipeIndex < data.length) {
        res.render("receipt", {receipt : data[`${recipeIndex}`]});
    } else {
        res.render("not-found")
      }
})

server.use(function (req, res) {
    res.status(404).render("not-found");
})