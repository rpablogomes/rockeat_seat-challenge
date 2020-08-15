const { Router } = require("express");

const express = require("express")
const routes = express.Router()

routes.get("/", function (req, res){
    return res.render("layout")
})

routes.get("/teacher", function (req, res){
    return res.render("teacher")
})

module.exports = routes