const usuario = {
  nome: "Diego",
  empresa: {
    nome: "Rocketseat",
    Cor: "Roxo",
    Foco: "Programação",
    Endereço: {
        Rua: "Rua Guilherme Gembala",
        Número: 260
    }
  }
};

console.log(`A empresa ${usuario.empresa.nome} está localizada em ${usuario.empresa.Endereço.Rua}, ${usuario.empresa.Endereço.Número}`)