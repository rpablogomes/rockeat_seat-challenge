for (let card of document.getElementsByClassName("card")){
        card.addEventListener("click", function (){
        document.querySelector("#modal").removeAttribute("hidden", "")
        document.getElementById("iframe").setAttribute("src", `https://rocketseat.com.br/${card.id}`)
    })
}

document.querySelector("#x").addEventListener("click", function(){
    document.querySelector("#modal").setAttribute("hidden", "")
    document.getElementById("iframe").setAttribute("src", "")
})