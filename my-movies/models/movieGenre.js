const {sequelize} = require('../startup/database')
const {  DataTypes } = require('sequelize');
const { Movie } = require('./movie')
const { Genre } = require('./genre')
const config = require('config')


const MovieGenre = sequelize.define('MovieGenre', {
    
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

    genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Genre,
            key: 'genreId'
          }
        
    }

},{tableName: 'moviegenres'})



exports.MovieGenre = MovieGenre;