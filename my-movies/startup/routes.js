
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, generateAuthToken} = require('../models/user')
const { Collection } = require('../models/collection')
const { Movie } = require('../models/movie')
const auth  = require('../middleware/auth')
const userRoutes = require('../appRoutes/userRoutes')
const { v4: uuidv4 } = require('uuid');
//const { putMovie } = require('../utilFunctions/setMovies')
//const { putMovieCollection } = require('../utilFunctions/setMovieCollection')

module.exports = function(app){

app.use(express.json());

app.use('/',userRoutes)

/*app.post('/register', async(req,res) => {

    const salt = await bcrypt.genSalt(18);
    const password = await bcrypt.hash(req.body.password, salt)

    const user = await User.findOne({ where: { userName: req.body.userName } });

    if(user) return res.status(400).send('User already registered')

    const newUser = {
        
        userName: req.body.userName,
        password: password,
        
    };

    await User.create(newUser)

    const token = generateAuthToken(newUser)

    res.send(token)

}
)

app.post('/collection', auth, async(req,res) => {
    
    const exstUser = await User.findOne({ where: { userName:req.user.userName } })
    const userId = exstUser.userId
    const collectionUuid = uuidv4()
    
    const collection = {

    title: req.body.title,
    description: req.body.description,
    userId:userId,
    collectionUuid: collectionUuid

    }

    await Collection.create(collection)

    const insrtCollection = await Collection.findOne({ where: { collectionUuid: collectionUuid} })
    const collectionId = insrtCollection.collectionId


    console.log(userId)
    console.log(collectionId)

    const movies = req.body.movies
    

    let movieLength = movies.length;
    let i = 0;
    let movieCollId = 1;
    
    while(i<movieLength){

    const movie = await Movie.findOne({ where: { title: movies[i].title }  } )
    
    if(movie){
      console.log('movie ',movie.title,' already present')
      console.log('movieId of ',movie.title,': ',movie.movieId)
      putMovieCollection(movie.movieId, collectionId, movieCollId)
      movieCollId++;
      i++;
      continue;
      
    }
    
    else{
      const insrtMovieId = await putMovie(movies[i], userId, collectionId)
      
      //const insrtMovie = await Movie.findOne({ where: { title: movies[i].title }  })
      //console.log("Movie ID after insertion ", insrtMovieId)
      putMovieCollection(insrtMovieId, collectionId, movieCollId)
      movieCollId++;
    }

    i++;
    
  
  }
    
    res.send(collection)



})*/

}