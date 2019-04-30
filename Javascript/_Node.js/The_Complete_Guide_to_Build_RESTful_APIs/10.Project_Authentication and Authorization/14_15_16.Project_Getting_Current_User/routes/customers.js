const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const { Customer } = require('../models/customer');
const { validateWithJoi,
    validatePhoneWithJoi } = require('../helpers/joi_validation');

router.get('/', async function(req, res) {
    let customers;
    try {
        customers = await Customer.find().sort({ name: 1 });
    } catch (error) {
        console.log(error.message);
    }
    return res.send(customers);
});

router.get('/:id', async function(req, res) {
    let customer;
    try {
        customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(400).send('No such customer.');
    } catch (error) {
        console.log(error.message);
    }
    return res.send(customer);
});

router.post('/', auth, async function(req, res) {
    let customer;
    try {
        const { error } = validateWithJoi(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        customer = new Customer({ name: req.body.name, phone: req.body.phone });
        customer = await customer.save();
    } catch (error) {
        console.log(error.message);
    }
    return res.send(customer);
});

router.put('/:id', auth, async function(req, res) {
    let customer;
    try {
        const { error } = validatePhoneWithJoi(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(400).send('No such customer.');
        // direct approach
        // await Customer.update({ _id: req.params.id },
        // { $set: { phone: req.body.phone } });
        // customer = await Customer.findById(req.params.id);
        customer.phone = req.body.phone;
        customer = await customer.save();
    } catch (error) {
        console.log(error.message);
    }
    return res.send(customer);
});

router.delete('/:id', auth, async function(req, res) {
    let customer;
    try {
        customer = await Customer.findByIdAndRemove(req.params.id);
        if (!customer) return res.status(400).send('No such customer.');
    } catch (error) {
        console.log(error.message);
    }
    return res.send(customer);
});

module.exports = { customers: router };
