const data = require("../../../data.json")
const fs = require("fs");

exports.index = function (req, res) {
    res.render("admin/recipes/recipes", { recipes: data.recipes })
}

exports.create = function (req, res) {

    return res.render("admin/recipes/create")
}

exports.show = function (req, res) {
    const receipt = data.recipes.find(i =>
        i.id == req.params.id
    )
    res.render("admin/recipes/receipt", { receipt })
}

exports.edit = function (req, res) {
    const idToCheck = req.params.id;

    const foundReceipt = data.recipes.find((receipt) => {
        return receipt.id == idToCheck;
    });

    let { id, image, title, author, ingredients, preparation, information } = foundReceipt


    const receipt = {
        id,
        image,
        title,
        author,
        ingredients,
        preparation,
        information
    };

    return res.render("admin/recipes/edit", { receipt });
}

exports.post = function (req, res) {
    const keys = Object.keys(req.body);

    //validation
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Fill all the fields");
        }
    }
    // Construct Object to Push into data
    let { image, title, author, ingredients, preparation, information } = req.body;

    const CheckHighestid = () => {
        let highestID = 0;
        for (let e of data.recipes) {
            if (e.id > highestID) {
                highestID = e.id;
            }
        }
        return highestID + 1;
    };

    const id = Number(CheckHighestid());

    data.recipes.push({
        id,
        image,
        title,
        author,
        ingredients,
        preparation,
        information
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("write file error");

        return res.redirect(`recipes/${id}`);
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
        id
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