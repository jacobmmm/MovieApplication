const {sequelize} = require('../startup/database')
const {  DataTypes, Sequelize } = require('sequelize');
const { Collection } = require('../models/collection')
const { Movie } = require('../models/movie')
const { MovieCollection } = require('../models/movieCollection')

const jwt = require('jsonwebtoken')
const config = require('config')

const putMovieCollection = async function(movieId, collectionId, movieCollId,transaction){

    const movieCollection = {
        //id: movieCollId,
        movieId: movieId,
        collectionId: collectionId
    }

    await MovieCollection.create(movieCollection,transaction)
}

exports.putMovieCollection = putMovieCollection