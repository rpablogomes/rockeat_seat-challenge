for (item of document.querySelectorAll("header a")) {
  if (location.pathname.includes(item.getAttribute("href").slice(0, 8))) {
    item.classList.add("active");
  }
}

document.getElementById("submitDelete").addEventListener("submit", (event) => {
  const confirmation = confirm("Do you want to delete this teacher?");
  if (!confirmation) {
    event.preventDefault();
  }
});
