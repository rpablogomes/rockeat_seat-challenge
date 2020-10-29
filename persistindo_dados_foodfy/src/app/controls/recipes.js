const { recipes } = require("../models/client");
const recipe = require("../models/recipe");
const getSince = require("../lib/utils").getSince;

exports.index = function (req, res) {
  recipe.paginate(callback);
  res.render("admin/recipes/recipes", { callback });
};

exports.create = function (req, res) {
  recipe.chefsList((chefsList) => {
    return res.render("admin/recipes/create", { chefsList });
  });
};

exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  //validation
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Fill all the fields");
    }
  }

  // Construct Object to Push into data
  let {
    chef_id,
    image,
    title,
    ingredients,
    preparation,
    information,
  } = req.body;

  const values = [
    chef_id,
    image,
    title,
    ingredients,
    preparation,
    information,
    getSince(),
  ];

  recipe.create(values, (callback) => {
    return res.redirect(`recipes/${callback}`);
  });
};

exports.show = function (req, res) {
  const id = req.params.id;
  recipe.find(id, (callback) => {
    res.render("admin/recipes/receipt", { receipt: callback });
  });
};

exports.edit = function (req, res) {

  let {
    id,
    image,
    title,
    author,
    ingredients,
    preparation,
    information,
  } = foundReceipt

  const receipt = {
    id,
    image,
    title,
    author,
    ingredients,
    preparation,
    information,
  };
  
  recipe.find(idToCheck, callback => {
    foundReceipt = callback
})

  recipe.find(id, (receipt) => {
    return res.render("admin/recipes/edit", { receipt });
  });
};

exports.put = function (req, res) {
  const id = Number(req.body.id);

  let index = 0;

  const foundReceipt = data.recipes.find((receipt, foundIndex) => {
    index = foundIndex;
    return receipt.id == id;
  });

  if (!foundReceipt) {
    return res.send("Not found");
  }

  const receipt = {
    ...foundReceipt,
    ...req.body,
    id,
  };

  data.recipes[index] = receipt;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write file error");
  });

  return res.redirect(`/admin/recipes/${id}`);
};

exports.delete = function (req, res) {
  const { id } = req.body;
  const filteredreceipt = data.recipes.filter((receipt) => {
    if (receipt.id != id) {
      return receipt;
    }
  });
  data.recipes = filteredreceipt;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Error");
    }

    return res.redirect("/admin/recipes");
  });
};
