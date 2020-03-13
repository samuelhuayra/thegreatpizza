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
module.exports = router;