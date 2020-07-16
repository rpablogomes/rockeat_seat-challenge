// const  indexOf  = require("../data.js")

// const { indexOf } = require("../data")

// const { indexOf } = require("../data")

for (let card of document.getElementsByClassName("card")) {
    card.addEventListener("click", function () {
        const foodIndex = card.getAttribute("id")
        window.location.href = `/receipts/${foodIndex}`
    })
} 
// document.querySelector("#x").addEventListener("click", function () {
//     document.querySelector("#modal").setAttribute("hidden", "")
//     document.getElementById("iframe").setAttribute("src", "")
// })