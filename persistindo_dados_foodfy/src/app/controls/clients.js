const client = require('../models/client')

exports.index = function (req, res) {
  client.index((callback) => {
  return res.render("../views/client/index", callback)
  }) 
};
exports.about = function (req, res) {
  return res.render("client/about");
};
exports.recipes = function (req, res) {
  client.recipes(req.id, (callback) => {
  return res.render("client/receipts", callback);
  })
};
exports.receipt = function (req, res) {

  const index = req.params.index

  client.recipe(index, (callback) => {

    // if(index < data.recipes.length)
    return res.render("../views/client/receipt", callback)
    //   receipt: callback,
    // });
    // else res.render("client/not-found"))
  })
}