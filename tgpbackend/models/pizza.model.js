const mongoose = require("mongoose");
const PizzaModel = mongoose.model("pizzas", {
    name: String,
    description: String,
    toppings: [{_id: String,name:String,description: String}]
});

module.exports = PizzaModel;