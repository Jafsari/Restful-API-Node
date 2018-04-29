const joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre',new mongoose.Schema({
    name: {
        type:String,
        minLength: 50,
        maxLength:50
    }
}));

const validateGenre = (genre) => {
    const schema = {
        name: Joi.string().min(3).required()
      };
    
      return Joi.validate(genre, schema);
}
exports.genreSchema = genreSchema;
exports.validate = validateGenre;
exports.Genre = Genre;