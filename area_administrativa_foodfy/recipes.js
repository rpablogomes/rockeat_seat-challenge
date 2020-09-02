const data = require("./data.json")


exports.index = function (req, res) {
    res.render("admin/recipes", {receipes: data.receipt})
}

exports.create = function () {

}

exports.show = function () {

}

exports.edit = function () {

}

exports.post = function () {

}

exports.put = function () {

}

exports.delete = function () {

} 
