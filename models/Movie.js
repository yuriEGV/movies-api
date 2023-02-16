var mongoose = require('mongoose');

var movieSchema = mongoose.Schema(
{    
    title: String,
    year: {type:Date, default: Date.now},
    duration: {type: Number}, 
    genre: [],
    director: String,
    plot: String,
    country: String,
    imdbRating: {type: Number, min:0, max:10}
}
);


module.exports = mongoose.model('Movie',movieSchema);
