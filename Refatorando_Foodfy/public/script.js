for (let card of document.getElementsByClassName("card")) {
    card.addEventListener("click", function () {
        const videoId = card.getAttribute("id")
        window.location.href = `/course?id=${videoId}`

    })
}

// document.querySelector("#x").addEventListener("click", function () {
//     document.querySelector("#modal").setAttribute("hidden", "")
//     document.getElementById("iframe").setAttribute("src", "")
// })