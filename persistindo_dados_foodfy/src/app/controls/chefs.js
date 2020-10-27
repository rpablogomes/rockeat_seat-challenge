const db = require("../../config/db");
const chef = require("../models/chef");
const getSince = require("../lib/utils").getSince;

exports.index = function (req, res) {
  chef.index((callback) => {
    return res.render("admin/chefs/chefs", { callback });
  });
};

exports.create = function (req, res) {
  res.render(`admin/chefs/chef_create`);
};

exports.show = function (req, res) {
  chef.find(req.params.id, callback => {
  res.render("admin/chefs/chef", { callback });
})
};

exports.edit = function (req, res) {
  const idToCheck = req.params.id;

  foundReceipt = chef.find(idToCheck, callback => {
      foundReceipt = callback
  });

  let {
    id,
    name,
    avatar_url,
    created_at
  } = foundReceipt;

  const receipt = {
    id,
    name,
    avatar_url,
    created_at
  };


  return res.render("admin/chefs/chef_edit", { receipt });
};

exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  //validation
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Fill all the fields");
    }
  }

  const values = [
    req.body.name,
    req.body.avatar_url,
    getSince()
  ]

  // Construct Object to Push into data

  chef.create(
      values, id => {
        return res.redirect(`chefs/${id}`);
    })
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

  data.chefs[index] = receipt;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write file error");
  });

  return res.redirect(`/admin/chefs/${id}`);
};

exports.delete = function (req, res) {
  const { id } = req.body;
  const filteredreceipt = data.chefs.filter((receipt) => {
    if (receipt.id != id) {
      return receipt;
    }
  });
  data.chefs = filteredreceipt;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Error");
    }

    return res.redirect("/admin/chefs");
  });
};
