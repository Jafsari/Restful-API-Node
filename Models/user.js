const joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User',new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minLength: 50,
        maxLength:50
    },
    email:{
        type:String,
        required:true,
        minLength: 5,
        maxLength: 30,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:1024
    }
}));

const validateUser = (user) => {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(30).email().required(),
        password: Joi.string().min(8).max(1024).unique().required()
      };
    
      return Joi.validate(user, schema);
}

exports.validate = validateUser;
exports.User = user;