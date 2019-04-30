const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const { Customer } = require('../models/customer');
const { validateWithJoi,
    validatePhoneWithJoi } = require('../helpers/joi_validation');

router.get('/', async function(req, res) {
    try {
        const customers = await Customer.find().sort({ name: 1 });
        return res.send(customers);
    } catch (error) {
        // Log the exeption
        console.log(error.message);
        // Send to client
        return res.status(500).send('Something failed');
    }
});

router.get('/:id', async function(req, res) {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(400).send('No such customer.');
        return res.send(customer);
    } catch (error) {
        // Log the exeption
        console.log(error.message);
        // Send to client
        return res.status(500).send('Something failed');
    }
});

router.post('/', auth, async function(req, res) {
    try {
        const { error } = validateWithJoi(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
        });
        customer = await customer.save();
        return res.send(customer);
    } catch (error) {
        // Log the exeption
        console.log(error.message);
        // Send to client
        return res.status(500).send('Something failed');
    }
});

router.put('/:id', auth, async function(req, res) {
    try {
        const { error } = validatePhoneWithJoi(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(400).send('No such customer.');
        // direct approach
        // await Customer.update({ _id: req.params.id },
        // { $set: { phone: req.body.phone } });
        // customer = await Customer.findById(req.params.id);
        customer.phone = req.body.phone;
        customer = await customer.save();
        return res.send(customer);
    } catch (error) {
        // Log the exeption
        console.log(error.message);
        // Send to client
        return res.status(500).send('Something failed');
    }
});

router.delete('/:id', auth, async function(req, res) {
    try {
        const customer = await Customer.findByIdAndRemove(req.params.id);
        if (!customer) return res.status(400).send('No such customer.');
        return res.send(customer);
    } catch (error) {
        // Log the exeption
        console.log(error.message);
        // Send to client
        return res.status(500).send('Something failed');
    }
});

module.exports = { customers: router };
