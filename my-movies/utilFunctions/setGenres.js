const {sequelize} = require('../startup/database')
const {  DataTypes, Sequelize } = require('sequelize');
const { Collection } = require('../models/collection')
const { Movie } = require('../models/movie')
const { Genre } = require('../models/genre')

const jwt = require('jsonwebtoken')
const config = require('config')

const putGenre = async function(gName){
    console.log("The genre is ",gName)
    const genre = {
        genreName: gName
    }

    const exstGenre = await Genre.findOne( { where: { genreName:gName }  } )

    if(exstGenre){
        console.log("Genre ",exstGenre.genreName,"ID: ",exstGenre.genreId,"already present")
        return exstGenre.genreId
    }

    else{
        await Genre.create(genre)

        const insrtdGenre = await Genre.findOne({ where: { genreName: gName }  } )
        console.log("Inserted Genre:",insrtdGenre)
        console.log("Genre ID after insertion",insrtdGenre.genreId)
        return insrtdGenre.genreId
    }
}

exports.putGenre = putGenre