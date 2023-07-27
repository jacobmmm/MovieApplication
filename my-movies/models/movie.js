const {sequelize} = require('../startup/database')
const {  DataTypes } = require('sequelize');
const { User } = require('./user')
const { Collection } = require('./collection')
const jwt = require('jsonwebtoken')
const config = require('config')


const Movie = sequelize.define('Movie', {
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING,
        validate:{
            len: [0,30]
        }
    },

    description: {
        type: DataTypes.STRING,
        validate:{
            len: [0,5000]
        }
    },

    movieUuid: {
        type: DataTypes.STRING
    }

},{tableName: 'movies'})



exports.Movie = Movie;
