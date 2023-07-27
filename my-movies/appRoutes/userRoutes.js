const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');

const {User, generateAuthToken} = require('../models/user')
const { DataTypes } = require('sequelize');

const { Collection } = require('../models/collection')
const { Movie } = require('../models/movie')
const { MovieCollection } = require('../models/movieCollection')
const  requestCount   = require('../models/requestcount')
const incrmntCounter = require("../middleware/counterOps")

const { Op, Sequelize } = require('sequelize');
const auth  = require('../middleware/auth')
const { putMovie } = require('../utilFunctions/setMovies')
const { putMovieCollection } = require('../utilFunctions/setMovieCollection')
const { extractAndInsertMovies } = require('../utilFunctions/extractMovies')
const { v4: uuidv4 } = require('uuid');
const {sequelize} = require('../startup/database')



router.use(async(req, res, next)=>{
  console.log("User router called")

  /*
  const reqCounter  = await RequestCount.findAll({attributes:['reqCounter']})

  if(reqCounter.length <= 0){
    await RequestCount.create({reqCounter:0})
  }

  else{
    console.log("Counter value already initialized")
  }
  console.log(reqCounter[0].reqCounter)*/
  next()
})

router.post('/register', incrmntCounter, async(req,res) => {

    const salt = await bcrypt.genSalt(18);
    const password = await bcrypt.hash(req.body.password, salt)

    const user = await User.findOne({ where: { userName: req.body.userName } });

    if(user) return res.status(400).send('User already registered')

    const newUser = {
        
        userName: req.body.userName,
        password: password,
        
    };

    try{
      const result = await sequelize.transaction(async (t) => {

      const user = await User.create(newUser, { transaction: t });
    
        //return user;
    
      });

      const token = generateAuthToken(newUser)

      res.send(token)



    //await User.create(newUser)

    }
    catch(error){
      res.send(error)
    }

    //const token = generateAuthToken(newUser)

    //res.send(token)

}
)

router.post('/collection', auth, incrmntCounter,  async(req,res) => {

    //reqCounter++;
    
    const exstUser = await User.findOne({ where: { userName:req.user.userName } })
    const userId = exstUser.userId
    const collectionUuid = uuidv4()
    
    const collection = {

    title: req.body.title,
    description: req.body.description,
    userId:userId,
    collectionUuid: collectionUuid

    }


    try{

    const result = sequelize.transaction(async (t) => {
    
      await Collection.create(collection, { transaction: t });

      const insrtCollection = await Collection.findOne({ where: { collectionUuid: collectionUuid },transaction: t })
      console.log(insrtCollection)
      const collectionId = insrtCollection.collectionId


      console.log(userId)
      console.log(collectionId)

      const movies = req.body.movies
      
      await extractAndInsertMovies(movies,collectionId,{ transaction: t }); 

      res.send(collection)
    })

    
    
    
      
    
    }
    catch(error){
      res.send(error)
    }


    /*
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
    
  
  }*/
    
    



})

router.get('/collection',auth, incrmntCounter, async(req,res) => {

  //reqCounter++;

  try{

    const result = sequelize.transaction(async (t) => {

      const collections = await Collection.findAll({attributes:['title', 'collectionUuid','description'], transaction:t })

      genreQuery = `select genreName from movie.moviegenres as mmg 
               inner join movie.genres as mg on mmg.genreId=mg.genreId group by genreName order by count(genreName) desc limit 3;`

      const [results, metadata] = await sequelize.query(genreQuery,{transaction: t});

  //console.log(results[0].genreId)

      res.send({is_success:true,data:collections,favourite_genres:[results[0].genreName,results[1].genreName,results[2].genreName]})

    })

  }
  catch(error){

  res.send(error)
  
  }
})

router.get('/collection/:collection_uuid', auth, incrmntCounter, async(req,res) => {

  //reqCounter++;

  const retrievedCollection = await Collection.findOne({where: { collectionUuid: req.params.collection_uuid }})

  const retrCollectionId = retrievedCollection.collectionId

  const query = `SELECT mm.movieId,mm.title,mm.description,mm.movieUuid
  FROM movie.movies as mm
  JOIN movie.moviecollection as mmc on mm.movieId = mmc.movieId
  JOIN movie.collections as mc ON mmc.collectionId = mc.collectionId where mc.collectionId=${retrCollectionId}`

  //console.log("Query is:\n")
  //console.log(query)

  const [results, metadata] = await sequelize.query(query);

  //const movies = JSON.stringify(results, null, 2)

  const movies = results

  const updatedMovies = movies.map(movie => {
    delete movie.movieId;
    delete movie.movieUuid;
    return movie;
  });

  console.log("Result of Query: \n")
  
  //console.log(movies);

  const respCollection = {title:retrievedCollection.title, description:retrievedCollection.description, movies:updatedMovies }

  
  /*const collectionMovies = await MovieCollection.findAll({where: {collectionId:retrCollectionId }})

  const respCollection = {title:retrievedCollection.title, description:retrievedCollection.description }

  for ( const cm in collectionMovies ){
    console.log(collectionMovies[cm].movieId)
  }*/
  
  

  //res.send({collectionMovies})
  res.send(respCollection)
  
})

router.delete('/collection/:collection_uuid', auth, incrmntCounter, async(req,res) => {

  //reqCounter++;

  const retrCollectionId = req.params.collection_uuid
  
  const deleteCollection = await Collection.destroy({where:{collectionUuid:retrCollectionId}});

  if(deleteCollection)
    res.send("Collection deleted")

  else
    res.send("Could not delete collection")

})

router.put('/collection/:collection_uuid', auth, incrmntCounter, async(req,res) => { 

  //reqCounter++;
  
  const retrievedCollection = await Collection.findOne({where: { collectionUuid: req.params.collection_uuid }})
  const retrCollectionId = retrievedCollection.collectionId
   

  if(req.body.title)
    console.log("Title ",req.body.title,"present")
    await Collection.update({title:req.body.title},{where:{collectionUuid:req.params.collection_uuid}})

  if(req.body.description)
    console.log("description", req.body.description ,"present")
    await Collection.update({description:req.body.description},{where:{collectionUuid:req.params.collection_uuid}})

  if(req.body.movies){
    console.log("movies present")

     

    const movieDelQuery = `delete from movie.movies where movieId in (select movieId from movie.moviecollection where collectionId=${retrCollectionId})`;
    console.log(movieDelQuery)

    await sequelize.query(movieDelQuery);

    const movies = req.body.movies
    
    await extractAndInsertMovies(movies,retrCollectionId)


  }

  const updtdCollection = await Collection.findOne({where: { collectionUuid: req.params.collection_uuid }})  

  

  const movieRetQuery = `SELECT mm.title,mm.description FROM movie.movies as mm JOIN movie.moviecollection as mmc on mm.movieId = mmc.movieId
  JOIN movie.collections as mc ON mmc.collectionId = mc.collectionId where mc.collectionId=${retrCollectionId}`

  const [results, metadata] = await sequelize.query(movieRetQuery);

  const changedMovies = results

  res.send({title:updtdCollection.title,description:updtdCollection.description,movies:changedMovies})

})

router.get('/request-count/',auth, async(req,res) => {

  const RequestCount = requestCount(sequelize, DataTypes)
  const reqCounterQuery  = await RequestCount.findAll({attributes:['reqcounter']})
  let counterVal = reqCounterQuery[0].reqcounter

  res.send({requests:counterVal})


})

router.post('/request-count/reset',auth, async(req,res) => {

  const resetQuery = `UPDATE movie.requestcounts
  SET reqcounter = 0 WHERE id=1;`

  const [results, metadata] = await sequelize.query(resetQuery);

  res.send({message:"request count reset successfully"})


})



module.exports = router