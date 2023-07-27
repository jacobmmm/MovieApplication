const { sequelize } = require('../startup/database')
const {  DataTypes } = require('sequelize');
const { Movie } = require('./movie')
const { Collection } = require('./collection')
const config = require('config')

const MovieCollection = sequelize.define('MovieCollection', {

    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Movie,
            key: 'movieId'
          },

        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },

    collectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Collection,
            key: 'collectionId'
          },

        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        
        
    }

},{tableName: 'moviecollection'})

exports.MovieCollection=MovieCollection