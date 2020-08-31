for(item of document.querySelectorAll("header a")){
    if(location.pathname.includes(item.getAttribute("href").slice(0 , 8))){
        console.log("ok")
        item.classList.add("active")
    }
}
