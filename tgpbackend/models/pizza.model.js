const mongoose = require("mongoose");
const PizzaModel = mongoose.model("pizzas", {
    name: String,
    description: String,
    toppings: Array
});

module.exports = PizzaModel;