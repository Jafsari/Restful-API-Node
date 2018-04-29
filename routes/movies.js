const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.router();

//CREATE
router.post('/', async (req,res) => {
    const { error } = validate(req.body);
    if (error){
        return res.status(400).send(error.details[0].message)
    }
   const genre = await Genre.findById(req.bodyg.genreId);
   if (!genre){
       return res.status(400).send('Invalid genre');
   }
  let movie = new Movie({
      title:req.body.title,
      genre:{
          _id:genre._id,
          name:genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
  });

  try{
      movie = await movie.save();
  }
  catch{
      res.status(500).send('Internal Error')
  }
  res.send(movie);
})

//READ
router.get('/', async (req,res) => {
const movies = await Movie.find().sort('name');
res.send(movies);
});

//UPDATE
router.put('/:id', async(req,res) => {
    const {error} = validate(req.body);
    if (error){
        return res.status(400).send(error.details[0].message)
    }
   const genre = await Genre.findById(req.body.genreId);
   if (!genre){
       return res.status(400).send('Invalid genre.')
   
}
const movie = await Movie.findByIdAndUpdate(req.params.id, {
    title:req.body.title,
    genre:{
        _id: genre._id,
        name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
}, {new: true});

if (!movie){
    return res.status(404).send('The movie with the given ID was not found')
}
res.send(movie);
});