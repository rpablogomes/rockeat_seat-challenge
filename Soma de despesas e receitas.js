const usuarios = [
  {
    nome: "Salvio",
    receitas: [115.3, 48.7, 98.3, 14.5],
    despesas: [85.3, 13.5, 19.9]
  },
  {
    nome: "Marcio",
    receitas: [24.6, 214.3, 45.3],
    despesas: [185.3, 12.1, 120.0]
  },
  {
    nome: "Lucia",
    receitas: [9.8, 120.3, 340.2, 45.3],
    despesas: [450.2, 29.9]
  }
];


function calculaSaldo(receitas, despesas) {

  somatorioReceitas = somaNumeros(receitas)
  somatorioDespesas = somaNumeros(despesas)

  saldo = somatorioReceitas - somatorioDespesas

  return saldo.toFixed(2)

}

function somaNumeros(numeros) {
  // Soma todos números dentro do array "numeros"
  s = 0

  for (i of numeros) s += i
  return s
}


for (let i of usuarios) {
  
  const saldoFinal = calculaSaldo(i.receitas, i.despesas);


  if(saldoFinal > 0){
      console.log( `${i.nome} tem saldo POSITIVO de ${saldoFinal}.`)
  } else {
      console.log( `${i.nome} tem saldo NEGATIVO de ${saldoFinal}.`)
  }
}