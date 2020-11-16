for (item of document.querySelectorAll("header a")) 
if (location.pathname.includes(item.getAttribute("href").slice(0, 8))) item.classList.add("active");

if (document.getElementById("submitDelete")) addEventListener("submit", (event) => {
    let confirmation = confirm("Do you want to delete this teacher?");
    if (!confirmation) event.preventDefault();
  });

let totalPage = document.querySelector("#pagination").dataset.totalpage
let selectedPage = document.querySelector("#pagination").dataset.page;
let filter = document.querySelector("#pagination").dataset.filter
let pages = [];


if(totalPage <= 8) for(i = 1; i <= totalPage; i++) pages.push(i);
else if (5 >= selectedPage) pages.push(1, 2, 3, 4, 5, 6, "...", totalPage);
else if (5 < selectedPage && selectedPage + 3 < totalPage)
  pages.push(
    1,
    2,  
    "...",
    selectedPage - 1,
    selectedPage,
    selectedPage + 1,
    "...",
    totalPage - 1,
    totalPage
  );
else
  pages.push(
    1,
    2,
    "...",
    totalPage - 4,
    totalPage - 3,
    totalPage - 2,
    totalPage - 1,
    totalPage
  );

let elements = ``;

for (let page of pages) 
if (page == "...")  elements += `<span>...</span>` 
else elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`;

document.getElementById("pagination").innerHTML = elements;