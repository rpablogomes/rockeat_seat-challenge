const express = require("express");
const routes = express.Router();

const SessionController = require("../app/controllers/SessionController")
const UserController = require("../app/controllers/UserController")

const UserValidator = require('../app/validators/user')

// // login/logout

// routes.get("/login",  SessionController.loginForm)
// routes.post("/login",  SessionController.login)
routes.post("/logout",  SessionController.logout)

// // reset password / forgot

// routes.get("/forgot-password",  SessionController.loginForm)
// routes.get("/password-reset",  SessionController.loginForm)
// routes.post("/forgot-password",  SessionController.login)
// routes.post("/password-reset",  SessionController.logout)

// // user register UserController
 
routes.get("/register", UserController.registerForm)
routes.post("/register",UserValidator.post, UserController.Post)

routes.get("/", UserValidator.show, UserController.show)
routes.put("/", UserValidator.update, UserController.update)
// routes.delete("/", UserController.delete)

module.exports = routes;