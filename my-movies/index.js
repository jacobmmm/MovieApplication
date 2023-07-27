const express = require('express')
const app = express();
const mysql = require('mysql2')
const { Sequelize, DataTypes } = require('sequelize');
const _ = require('lodash');
const Joi = require('joi')
const bcrypt = require('bcrypt');
const config = require('config')
const jwt = require('jsonwebtoken')

const {sequelize, authenticate} = require('./startup/database')
authenticate()

const {User, generateAuthToken} = require('./models/user')
const {Movie} = require('./models/movie')
const { MovieGenre } = require('./models/movieGenre')
const { Genre } = require('./models/genre')
const { Collection } = require('./models/collection')
const { MovieCollection } = require('./models/movieCollection')
const { RequestCount } = require('./models/reqCount')


sequelize.sync({ alter: true }).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error.message)
})

require('./startup/routes')(app)

const port = process.env.PORT || 3000
app.listen(port,() => console.log(`Listening on port ${port}....`));