const User = require("../models/User");

async function post(req, res, next) {
    const keys = Object.keys(req.body);

    //validation
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Fill all the fields");
      }
    }

    let { email, cpf_cnpj, password, passwordRepeat } = req.body

    cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

    const user = await User.findOne({
        where: { email },
        or: { cpf_cnpj }
    })

    if (user) return res.send('user exists')

    if(password != passwordRepeat) return res.send('Password mismatch')

    next()
}

module.exports = {
post
} 