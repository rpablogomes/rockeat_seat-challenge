const data = require("../../../data.json")
    
    exports.index = function (req, res) {
      return res.render("client/index", { foods: data.recipes })
    };
    exports.about = function (req, res) {
    return res.render("client/about")
    };
    exports.recipes = function (req, res) {
    return res.render("client/receipts", { foods: data.recipes })
    };
    exports.receipt = function (req, res) {
    const recipeIndex = req.params.index;

    if (recipeIndex < data.recipes.length) return res.render("../views/client/receipt", { receipt: data.recipes[`${recipeIndex}`] });
    else res.render("client/not-found")
    };