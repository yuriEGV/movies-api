var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
/*var Movie = require('../models/Movie.js');*/
var Movie = require('C:/movies-api/models/Movie.js');

/* GET movies listing. */
router.get('/', function(req, res, next) {
Movie.find().sort('-year').exec(function(err, movies){
  if(err) res.status(500).send(err);
  else res.status(200).json(movies);

});
});

  /*res.send('devuelve todas las peliculas');*/


/* GET movie identify by id listing. */
router.get('/:id', function(req, res, next) {

Movie.findById(req.params.id, function(err, movieinfo){
  if (err) res.status(500).send(err);
  else res.status(200).json(movieinfo);
});

  /*res.send('devuelve la pelicula' + req.params.id);*/
});


/* post a new movie . */
router.post('/', function(req, res, next) {

/*  res.send('post the movie with title' + req.body.title);*/

Movie.create(req.body, function(err, movieinfo) {
  if (err) res.status(500).send(err);
  else res.sendStatus(200);});
});




/* put movies identify by id. */
router.put('/:id', function(req, res, next) {

 /* res.send('put the movie with title' + req.params.id);*/
Movie.findByIdAndUpdate(req.params.id, req.body, function(err, movieinfo){
  if (err) res.status(500).send(err);
  else res.sendStatus(200);
});

});

/* delete movies eliminara pelicula listing. */
router.delete('/:id', function(req, res, next) {
Movie.findByIdAndDelete(req.params.id, req.body, function(err, movieinfo){
if (err) res.status(500).send(err);
else res.sendStatus(200);

}); 
  /*res.send('delete the movie ' + req.body.title);*/
});


module.exports = router;
