const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const Movie = mongoose.model('Movies' ,new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minLength: 5,
        maxLength: 255
    },
    genre: {
        type: genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required: true,
        min:0,
        max: 255
    },
    dailyRentalRate:{
        typ:Number,
        required:true,
        min:0,
        max:255
    }
}));

const validateMovie = (movie) => {
    const schema = {
        title: JOi.string().min(5).max(50).required(),
        genreId:Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };
    return Joi.validate(movie,schema)
}

exports.Movie = Movie;
exports.validate = ValidateMovie;