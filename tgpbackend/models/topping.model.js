const mongoose = require("mongoose");
const ToppingModel = mongoose.model("toppings", {
    name: String,
    description: String
});

module.exports = ToppingModel;