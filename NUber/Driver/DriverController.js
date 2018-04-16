var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Driver = require('./Driver');
var Customer = require('../Customer/Customer');

router.get('/:id', function (req, res) {
    Driver.findById(req.params.id, function(err, driver) {
        if(err)
            return res.status(500).send("There was a problem finding the driver");
        if(driver == null)
            return res.status(500).send("Driver with given id does not exist");
        if(driver.currentCustomer == "0")
            return res.status(500).send("No assigned customer");

        Customer.findById(driver.currentCustomer, function(err, customer) {
            if(err || customer == null)
                return res.status(500).send("There was a problem finding the customer");
            return res.status(200).send(customer);
        });
    });
});

router.put('/:id', function (req, res) {
    
    Driver.findByIdAndUpdate(req.params.id, {availability: req.body.availability}, {new: true}, function (err, driver) {
        if (err) return res.status(500).send("You must either be set as available(true) or unavailable(false).");
        res.status(200).send(driver);
    });
});

module.exports = router;