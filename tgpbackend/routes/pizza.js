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

router.get(`/getPizzas`, async (req, res, next) => {
    try {
        const result = await PizzaModel.find().sort({ name: 'asc' }).exec();
        res.json(result);
    } catch (e) {
        next(e);
    }
});

router.get(`/getPizza/:_id`, async (req, res, next) => {
    try {
        if (!req.params._id) throw new Error('Id is blank');
        const pizza = await PizzaModel.findById(req.params._id).exec();
        res.json(pizza);
    } catch (e) {
        next(e);
    }
});
router.put(`/editPizza/:_id`, async (req, res, next) => {
    try {
        if (!req.params._id) throw new Error('Id is blank');
        if (!req.body.name) throw new Error('Name is blank');
        await PizzaModel.findByIdAndUpdate(req.params._id, req.body).exec();
        const pizza = await PizzaModel.findById(req.params._id).exec();
        res.json(pizza);
    } catch (e) {
        next(e);
    }
});

router.delete(`/deletePizza/:_id`, async (req, res, next) => {
    try {
        if (!req.params._id) throw new Error('Id is blank');
        var pizza = await PizzaModel.deleteOne({ _id: req.params._id }).exec();
        res.json(pizza);
    } catch (e) {
        next(e);
    }
});

module.exports = router;