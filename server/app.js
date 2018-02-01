//import approiate modules
const express = require('express');

var bodyParser = require('body-parser');
//var path=require('path');
var morgan = require('morgan');
var axios = require('axios');
//var path = require('path');
//var fs = require('fs');

//creats cache json
var cacheitems = {};
//creates express
const app = express();

//creates log stream
//var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

app.use(morgan('dev'));
app.use(bodyParser.json());



app.get('/', function (req, res) {
    var movieId = req.query.i;
    var movieTitle = req.query.t;
    console.log('this is the movie name'+ movieTitle);
    console.log('this is the movie id'+ movieId);
    console.log('http://localhost:3000/?t='+movieTitle);
    if (movieId!=undefined) {
        if (movieId == cacheitems.movieId) {
            //return cacheitems.url;
            res.status(200).json(cacheitems.data);
            console.log('MovieId sent from cache from id');
        } else {
            axios.get('http://www.omdbapi.com/?i=' + movieId + '&apikey=8730e0e')
                .then(function (response) {
                    cacheitems = { 'movieId': movieId, 'data': response.data };
                    res.json(response.data);
                    console.log('goes to cache from id');



                })

                .catch(function error() {
                    console.log(error);
                });
        }
    }
    else {
        if (movieTitle == cacheitems.MovieTitle) {
            res.status(200).json(cacheitems.data);
            console.log('cache from name');
        }
        else {
            console.log('Moviename ' + movieTitle);
            console.log('cache items ' + cacheitems.data);
            axios.get('http://www.omdbapi.com/?t=' + movieTitle.replace(' ','%20')+ '&apikey=8730e0e')
                .then(function (response) {
                    cacheitems = { 'MovieTitle': movieTitle, 'data': response.data };
                    console.log('cache items ' + cacheitems.data);
                    res.json(response.data);
                    console.log('sent from axios from name');

                }
                );
        }
    }
});













//axios.get('http://omdbapi.com/?i=' + movieId + '&apikey=6be7ee35')










// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter



//! Server should log each request using morgan's dev format.
//! Server should indicate when it is listening, and on which port.
//! Server should respond to GET requests to /?i=tt3896198 with movie data.
//! Server should respond to GET requests to /?i=tt3896198 with movie data without fetching from the OMDb api.
// Server should also respond to GET requests to /?t=baby%20driver with movie data.
// Server should also respond to GET requests to /?t=baby%20driver with movie data without fetching from the OMDb api.
// All tests should pass.


module.exports = app;