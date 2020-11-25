const express = require("express")
const routes = require.Router()

server.get("/", function (req, res) {
    return res.send("ok")
});

module.exports = routes