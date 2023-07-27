/*class RequestCounter {
    constructor() {
      
        this.reqCounter = 0;
      
    }
  
    incrmntCounter(req, res) {
      this.reqCounter++;
      // Rest of the code...
    }

    getCounter(req,res) {
       return reqCounter;
    }

    resetCounter(req,res) {
      
      this.reqCounter = 0;  
    }
  

  }*/

const  requestCount   = require('../models/requestcount')
const { DataTypes } = require('sequelize');
const {sequelize} = require('../startup/database')

async function incrmntCounter(req,res,next){

  try {

    const result = await sequelize.transaction(async (t) => {
  
      const RequestCount = requestCount(sequelize, DataTypes)
    
      const reqCounter  = await RequestCount.findAll({attributes:['reqcounter'], transaction:t})
    
      let counterVal = reqCounter[0].reqcounter
    
      counterVal++;
    
      counterQuery = `UPDATE movie.requestcounts
      SET reqcounter = ${counterVal} WHERE id=1;`

      const [results, metadata] = await sequelize.query(counterQuery, {transaction: t});

      next()
  
    });
  
    // If the execution reaches this line, the transaction has been committed successfully
    // `result` is whatever was returned from the transaction callback (the `user`, in this case)
  
  } catch (error) {
  
    console.log("Counter Error: ",error)
    next()
    // If the execution reaches this line, an error occurred.
    // The transaction has already been rolled back automatically by Sequelize!
  
  }



}

//const reqCounter = new RequestCounter()
module.exports = incrmntCounter
//exports.reqCounter = reqCounter

