const express = require('express');
const router = express.Router();
const PizzaModel = require('../models/pizza.model');

router.post(`/addPizza`, async (req, res, next) => {
    try {
        if (!req.body.name) throw new Error('Name is blank');
        if (!req.body.toppings) throw new Error('There are no toppings added');
        const pizza = new PizzaModel(req.body);
        const result = await pizza.save();
        res.json(result);
    } catch (e) {
        next(e);
    }
});
module.exports = router;