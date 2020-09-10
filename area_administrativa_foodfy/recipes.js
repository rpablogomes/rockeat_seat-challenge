const data = require("./data.json")

exports.index = function (req, res) {
    res.render("admin/recipes", { recipes: data.recipes })
}

exports.create = function (req, res) {
    return res.render("admin/create")
}

exports.show = function (req, res) {
    const receipt = data.recipes.find(i => 
        i.title == req.params.id
        )
        res.render("admin/receipt", { receipt })
}

exports.edit = function (req, res) {
    return res.render("admin/edit")
}

exports.post = function () {

}

exports.put = function () {

}

exports.delete = function () {

} 