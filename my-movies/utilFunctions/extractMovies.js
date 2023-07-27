const { Movie } = require('../models/movie')
const { putMovie } = require('./setMovies')
const { putMovieCollection } = require('./setMovieCollection')

const extractAndInsertMovies = async function(movies, collectionId,transaction){

    let movieLength = movies.length;
    let i = 0;
    let movieCollId = 1;
    
    while(i<movieLength){

    const movie = await Movie.findOne( { where: { title: movies[i].title }  } )
    
    if(movie){
      console.log('movie ',movie.title,' already present')
      console.log('movieId of ',movie.title,': ',movie.movieId)
      await putMovieCollection(movie.movieId, collectionId, movieCollId,transaction)
      i++;
      //continue;
      
    }
    
    else{
      const insrtMovieId = await putMovie(movies[i], collectionId, transaction)
      
      const insrtMovie = await Movie.findOne({ where: { title: movies[i].title }  })
      console.log("Movie ID after insertion ", insrtMovieId)
      await putMovieCollection(insrtMovieId, collectionId, movieCollId,transaction)
      //movieCollId++;
      i++
    }

    //i++;
    
  
  }


}

/*
const movies = [{
    "title":"Race Gurram",
    "description":"dsjfhdsafhfdsahldhfsa",
    "genres":["comedy","drama","action","romance"],
    "uuid":"9f06eb18-8b4d-4707-95de-88f42cd6f271"
},

 {
    "title":"Attarintikki Daredi",
    "description":"sadjfdskf kdhsfkfdsh",
    "genres":["action","drama","comedy","romance"],
    "uuid":"a20a4a09-28c9-4f49-995f-fb817988326a"
}]


extractAndInsertMovies(movies,5,2)*/

exports.extractAndInsertMovies = extractAndInsertMovies