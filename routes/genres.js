const { Genre, validate} = require('./Models/genre')
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const genreSchema = mongoose.model({
    name:{
        type: String,
        required:true,
        minLength:5,
        maxLength:10
    }
});

const Genre = new Schema('Genre',genreSchema);

//Read
router.get('/', async (req,res) => {
    try{ 
const genres = await Genre.find().sort('name');
    }
    catch(ex){
        console.log(ex.message);
    }
res.send(genres);
});

//Create
router.post('/', async (req,res) => {
    const { error } = validateGenre(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    };
    let genre = new Genre({name: req.body.name});
    try{
        genre = await genre.save();
    }
    catch(ex) {
        console.log(ex.message);
    }
    res.send(genre);
})

//Update
router.post('/:id', async(req,res) => {
    const { error } = validateGenre(req.body);
    if (error){
        return res.status(400).send(error.details[0].message)
    };
    try{
        const genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},
        {new:true})
     }
     catch{
         return res.status(404).send('The genre with the given id was not found')
     }
     res.send(genre)
});

//Delete

router.post('/:id',async (req,res) => {
    const { error } = validateGenre(req.body);
    if (error){
        return res.status(400).send(error.details[0].message)
    };
    try{
        let genre = Genre.findByIdAndRemove(req.params.id);
    }
    catch{
        return res.status(404).send('The genre with the given id was not found')
    }
    res.status(200).send(genre)
});

function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre,schema);
}



