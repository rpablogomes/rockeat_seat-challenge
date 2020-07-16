// const  indexOf  = require("../data.js")

// const { indexOf } = require("../data")

// const { indexOf } = require("../data")

for (let card of document.getElementsByClassName("card")) {
    card.addEventListener("click", function () {
        window.location.href = `/receipt/${foodIndex}`
    })
} 
// document.querySelector("#x").addEventListener("click", function () {
//     document.querySelector("#modal").setAttribute("hidden", "")
//     document.getElementById("iframe").setAttribute("src", "")
// })