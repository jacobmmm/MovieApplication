const {sequelize} = require('../startup/database')
const {  DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken')
const config = require('config')


const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [3,11]
        }
    },
    
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{tableName: 'users'})

const generateAuthToken = function(object){
    const token = jwt.sign({userId: object.userId,userName:object.userName}, config.get('jwtPrivateKey'))
    return token;
}

exports.User = User;
exports.generateAuthToken = generateAuthToken;