const express = require("express")
const nunjucks = require("nunjucks")

const server = express()

server.use(express.static("public"))

server.set("view engine", "html")

nunjucks.configure("views", {
    express: server
})

server.listen(5000, function () {
    console.log("Server is running!")
})

// routes

server.get("/", function (req, res) {
    return res.render("layout")
})

server.get("/inicio", function (req, res) {
    return res.render("/")
})

server.get("/about", function (req, res) {
    return res.render("rocketseat")
})

server.get("/content", function (req, res) {
    return res.render("course")
})

server.use(function(req, res){
    res.status(404).render("not-found");
})