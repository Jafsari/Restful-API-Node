const mongoose = require('mongoose');
const genres = require('./genres/routes');
const customers = require('./customers/routes');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
.then(function(){
    console.log('Connected to MongoDB....')
}).
catch(function(){
    console.log('Could not connect to MongoDB')
})

app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/genres',customers);

const port = process.env.port || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));
