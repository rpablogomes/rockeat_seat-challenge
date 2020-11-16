function addIngredient() {
  const ingredients = document.querySelector("#ingredients");
  const fieldContainer = document.querySelectorAll(".ingredient");

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if (newField.children[0].value == "") return false;

  newField.children[0].setAttribute("value", "");
  ingredients.appendChild(newField);
}
if(document.querySelector(".add-ingredient")){
document
  .querySelector(".add-ingredient")
  .addEventListener("click", addIngredient);
}

function addStep() {
  const steps = document.querySelector("#steps");
  const fieldContainer = document.querySelectorAll(".step");

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if (newField.children[0].value == "") return false;

  newField.children[0].value = "";
  steps.appendChild(newField);
}

if(document.querySelector(".add-step")){
  document.querySelector(".add-step").addEventListener("click", addStep)
}

function deleteOrNo() {

  const formDelete = document.querySelector("#form-delete");

  formDelete.addEventListener("submit", function (event) {
      alert("Chefs com com receitas cadastradas não podem ser excluídos.")
      event.preventDefault();
    });
}

const confirmDelete = document.querySelector("#deleteConfirmation").value

if (confirmDelete == "false") {
  console.log("ok")
  deleteOrNo();
}