for (let card of document.getElementsByClassName("card")) {
    card.addEventListener("click", function () {
        const foodIndex = card.getAttribute("id")
        window.location.href = `/receipts/${foodIndex}`
    })
}

// INGREDIENTS FUNCTION
document.querySelector("#visibilityLinksINGREDIENTS")
    .addEventListener("click", function () {
        document.querySelector("#showINGREDIENTS").toggleAttribute("hidden")
        document.querySelector("#hideINGREDIENTS").toggleAttribute("hidden")
        document.querySelector("#contentINGREDIENTS").toggleAttribute("hidden")
    })

// STEPS FUNCTION
document.querySelector("#visibilityLinksSTEPS")
    .addEventListener("click", function () {
        document.querySelector("#showSTEPS").toggleAttribute("hidden")
        document.querySelector("#hideSTEPS").toggleAttribute("hidden")
        document.querySelector("#contentSTEPS").toggleAttribute("hidden")
    })

// INFORMATION FUNCTION
document.getElementById("visibilityLinksINFORMATION")
    .addEventListener("click", function () {
        document.querySelector("#showINFORMATION").toggleAttribute("hidden")
        document.querySelector("#hideINFORMATION").toggleAttribute("hidden")
        document.querySelector("#contentINFORMATION").toggleAttribute("hidden")
    })

    console.log(document.querySelector("#pagination").dataset.filter)
