const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const data = require("./data")
const courses = require("./data").courses

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
    return res.render("layout", { menu: data.menu })
})

server.get("/inicio", function (req, res) {
    return res.render("/")
})

server.get("/about", function (req, res) {
    return res.render("rocketseat", { about: data.about, menu: data.menu })
})

server.get("/course", function (req, res) {
    const videoId = req.query.id

    const video = courses.find(function (video) {
        if (videoId == video.id) {
            return true
        }
    })

    if (!video) {
        return res.render("not-found")
    }

    res.render("video", { id: video.id })
    // res.render( "video", { videoId }, { menu: data.menu })
})

// server.get("/courses/:id", function(req, res) {
//     const id = req.params.id;
//     return res.render("video", {id});
//   });

server.get("/content", function (req, res) {
    return res.render("content", { courses: data.courses, menu: data.menu })
})

server.use(function (req, res) {
    res.status(404).render("not-found",);
})