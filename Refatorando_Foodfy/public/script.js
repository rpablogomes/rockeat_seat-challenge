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



document.querySelector("#hiddenFunctionOfIngredients")
    .addEventListener("click", function () {
        document.querySelector(".hiddenFunctionOfIngredientsTEXT").toggleAttribute("hidden")
     
})

document.querySelector(".hiddenFunctionOfSteps")
    .addEventListener("click", function () {
        document.querySelector("#hiddenFunctionOfStepsTEXT").toggleAttribute("hidden")
        document.querySelector("hiddenFunctionOfSteps")
        // document.getElementsByClassName("hiddenFunctionOfSteps").toggleAttribute("hidden")
        // document.querySelector("#hiddenFunctionOfStepsTEXT").toggleAttribute("hidden")
})

document.getElementById("hiddenFunctionOfInformations")
    .addEventListener("click", function () {
        document.getElementById("hiddenFunctionOfInformationsTEXT").toggleAttribute("hidden")
})