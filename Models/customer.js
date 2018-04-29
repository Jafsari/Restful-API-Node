const Joi = require('Joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer',new mongoose.Schema({
    name:{
        type:String,
        minLength:5,
        maxLength:50,
        required:true
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phone:{
        type:String,
        minLength:7,
        maxLength:7,
        required:true
    }
}));

const validCustomer = (customer) => {
    const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean()
    }
    return Joi.validate(customer,schema);
};

exports.Customer = Customer;
exports.validate = validCustomer;


