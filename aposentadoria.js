const nome = "Silvana";
const sexo = "F";
const idade = 48;
const contribuicao = 23;
const calculoContribuicao = idade + contribuicao;

if (sexo == "F") {
    if (calculoContribuicao >= 85) {
      console.log(`${nome}, você pode se aposentar!`)
    } else {
      console.log(`${nome}, você ainda não pode se aposentar!`)
    }
  } else {
    if (calculoContribuicao >= 95) {
        console.log(`${nome}, você pode se aposentar!`)
      } else {
        console.log(`${nome}, você ainda não pode se aposentar!`)
  }
}