const {sequelize} = require('../startup/database')
const {  DataTypes, Sequelize } = require('sequelize');
const { User } = require('./user')
const jwt = require('jsonwebtoken')
const config = require('config')


const Collection = sequelize.define('Collection', {
    collectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    userId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'userId'
        },
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

    collectionUuid: {
        type: DataTypes.STRING,
    }

},{tableName: 'collections'})



exports.Collection = Collection;
