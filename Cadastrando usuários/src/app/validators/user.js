const User = require("../models/User");

const { compare } = require("bcryptjs")

function checkAllFields(body){
    const keys = Object.keys(body);

    //validation
    for (key of keys) {
      if (req.body[key] == "") {
        return {
          user: body,
          error: "Por favor, preencha todos os campos"
      }
      }
    }
}

async function show(req, res, next) {

  const { userId: id } = req.session
        
  const user = await User.findOne({ where: { id } })

  if(!user) return res.render("user/index",{
      error: "Usuário não encontrado!"
  })

  req.user = user

  next()
}
async function post(req, res, next) {
  const fillAllFields = checkAllFields(req.body)
  if(fillAllFields){
      return res.render("user/index", fillAllFields)
  }

  const { id, password } = req.body

  if(!password) return res.render("user/index", { 
      user:req.body,
      error: "Coloque sua senha para atualizar o seu cadastro"
  })

  const user = await User.findOne({ where: { id }})

  const passed = await compare(password, user.password)

  if(!passed) return res.render('user/index', {
      user: req.body,
      error: "Senha incorreta"
  })

  req.user = userId

  next()

    let { email, cpf_cnpj, password, passwordRepeat } = req.body

    cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

    const user = await User.findOne({
        where: { email },
        or: { cpf_cnpj }
    })

    if (user) return res.render('user/register', {
        user: req.body,
        error: "Usuário já cadastrado"
    })

    if(password != passwordRepeat) return res.render('user/register', {
      user: req.body,
      error: "A senha e a repetição estão diferentes."
  })
    next()
}
async function update(req, res, next) {
    //all fields
    const keys = Object.keys(req.body);

    //validation
    for (key of keys) {
      if (req.body[key] == "") {
        return res.render('user/register', {
          user: req.body,
          error: "Por favor, preencha todos os campos"
      })
      }
    }

        //has password

        // password match
}

module.exports = {
post,
show,
update
} 