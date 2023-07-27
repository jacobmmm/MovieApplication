const {sequelize} = require('../startup/database')
const {  DataTypes } = require('sequelize');

const config = require('config')

const Genre = sequelize.define('Genre', {
    
    genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    
    genreName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [0,30]
        }
    },

   

},{tableName: 'genres'})

exports.Genre = Genre;
