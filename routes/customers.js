const  { Customer, validate} = require('./Models/customer')
const express = require('express');
const joi = require('joi');
const mongoose = require('mongoose');
const router = express.router();

//Create CRUD

//Create
router.post('/', async (req,res) => {
    const { error } = ValidateCustomer(req.body);
    if (error){
        return res.status(400).send(error.details[0].mesage)
    }
    let customer = new Customer({name:req.body})
    try {
        customer = await customer.save()
    }
    catch(ex) {
        res.status(404).send(ex.message)
    }
    return res.send(customer)
});

//Read
router.get('/',async(req,res) => {
    try{
    let result = Customer.find().sort('name')
    }
    catch{
        res.status(400).send('There was an error!')
    }
return res.send(result);
});

//Update
router.put('/:id', async(req,res) => {
    const { error } = ValidateCustomer(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    }
    try{
        let result = await Customer.findByIdAndUpdate(req.params.id,{name: req.body.name},
        {new:true}
        )
    }
    catch{
        res.status(404).send('Could not find the ID')
    }
    return res.send(result)
});

//Delete

router.post('/:id', async(req,res) => {
    try {
        let result = Customer.findByIdAndRemove(req.params.id)
    }
    catch {
        res.status(404).send('Could not find Id')
    }
    return res.send(result)
});

function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        isGold: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(7).required()
    }
    return Joi.validate(genre,schema);
}

module.exports = router;





