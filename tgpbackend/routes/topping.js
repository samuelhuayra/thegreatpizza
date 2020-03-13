const express = require('express');
const router = express.Router();
const ToppingModel = require('../models/topping.model');

router.post(`/addTopping`, async (req, res, next) => {
    try {
        if (!req.body.name) throw new Error('Name is blank');
        const topping = new ToppingModel(req.body);
        const result = await topping.save();
        res.json(result);
    } catch (e) {
        next(e);
    }
});

router.get(`/getToppings`, async (req, res, next) => {
    try {
        const result = await ToppingModel.find().sort({ name: 'asc' }).exec();
        res.json(result);
    } catch (e) {
        next(e);
    }
});

router.get(`/getTopping/:_id`, async (req, res, next) => {
    try {
        if (!req.params._id) throw new Error('Id is blank');
        const topping = await ToppingModel.findById(req.params._id).exec();
        res.json(topping);
    } catch (e) {
        next(e);
    }
});

router.put(`/editTopping/:_id`, async (req, res, next) => {
    try {
        if (!req.params._id) throw new Error('Id is blank');
        if (!req.body.name) throw new Error('Name is blank');
        await ToppingModel.findByIdAndUpdate(req.params._id, req.body).exec();
        const topping = await ToppingModel.findById(req.params._id).exec();
        res.json(topping);
    } catch (e) {
        next(e);
    }
});

router.delete(`/deleteTopping/:_id`, async (req, res, next) => {
    try {
        if (!req.params._id) throw new Error('Id is blank');
        var topping = await ToppingModel.deleteOne({ _id: req.params._id }).exec();
        res.json(topping);
    } catch (e) {
        next(e);
    }
});

module.exports = router;