$(document).ready(() => {
    $('#mask').mask('999.999.999-99');
})

const number = {
    formatBRL(value) {

        value.value = value.value.replace(/\D/g, "");

        return value.value = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value.value / 100);

      }
}