const client = require('../models/client')

exports.index = function (req, res) {
  client.index(callback => {
  res.render("../views/client/index", {recipes: callback})
  }) 
};
exports.about = function (req, res) {
  return res.render("client/about");
};
exports.recipes = function (req, res) {
  client.recipes(callback => {
  return res.render("client/receipts", {recipes: callback});
  })
};
exports.receipt = function (req, res) {
  const id = req.params.id
  
  client.recipe(id, callback => {
    return res.render("../views/client/receipt", { receipt : callback})
  })
}