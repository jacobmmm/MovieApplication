const {sequelize} = require('../startup/database')
const {  DataTypes, Sequelize } = require('sequelize');
//const { User } = require('../models/user')
const { Movie } = require('../models/movie')
const { MovieGenre } = require('../models/movieGenre')
const jwt = require('jsonwebtoken')
const config = require('config')
const { putGenre } = require('../utilFunctions/setGenres')



const putMovie = async function(movie,collectionId, transaction){      //userId was middle arggument

    
    const insrtMovie = {
        title: movie.title,
        description: movie.description,
        movieUuid: movie.uuid
    }

    await Movie.create(insrtMovie)
    console.log("Movie: ",movie.title,"inserted")
    console.log("Genres for movie ",movie.title,": ",movie.genres)

    const movieGenres = movie.genres;
    const genreLen = movieGenres.length;


    

    const insrtdMovie = await Movie.findOne({ where: { title: movie.title }  } )
    console.log("Inserted Movie:",insrtdMovie)
    console.log("movie ID after insertion",insrtdMovie.movieId)

    let i = 0;
    //console.log("Genres one by one:")
    while(i<genreLen){
        const genre = movieGenres[i]
        //console.log(genre)
        const genreId = await putGenre(genre)

        const movieGenre = {
            movieId: insrtdMovie.movieId,
            genreId: genreId 
        }

        await MovieGenre.create(movieGenre, transaction)
        i++;
    }

    return insrtdMovie.movieId

   
    }
    
   

    

    

  

exports.putMovie = putMovie