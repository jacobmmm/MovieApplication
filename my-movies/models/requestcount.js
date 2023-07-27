'use strict';
const {
  Model
} = require('sequelize');




module.exports = (sequelize, DataTypes) => {
  class RequestCount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RequestCount.init({
    reqcounter: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RequestCount',
  });
  return RequestCount;
};

/*
const requestCount = function (sequelize, DataTypes) {

  class RequestCount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /*static associate(models) {
      // define association here
    }
  }
  RequestCount.init({
    reqcounter: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RequestCount',
  });
  return RequestCount;

}

exports.requestCount = requestCount*/