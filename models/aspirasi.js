'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class aspirasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  aspirasi.init({
    user_id: DataTypes.STRING,
    laporan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'aspirasi',
  });
  return aspirasi;
};