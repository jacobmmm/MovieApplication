const {sequelize} = require('../startup/database')
const {  DataTypes } = require('sequelize');

const config = require('config')

const RequestCount = sequelize.define('RequestCount', {
    
   reqCounter: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
    },

   

},{tableName: 'requestcount'})

exports.RequestCount = RequestCount;