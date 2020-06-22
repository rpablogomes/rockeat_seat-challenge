const candidato = {
    nome : "Carlos",
    idade: 32,
    habilidades: [
      { nome: "C++", especialidade: "Desktop" },
      { nome: 'Python', especialidade: 'Data Science' },
      { nome: "JavaScript", especialidade: "Web/Mobile" }, 
    ]
  };

  console.log(`O usuário ${candidato.nome} tem ${candidato.idade} anos e usa a tecnologia ${candidato.habilidades[0].nome} com especialidade em ${candidato.habilidades[0].especialidade}`)
