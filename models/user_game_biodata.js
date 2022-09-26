'use strict';
const {
  Model
} = require('sequelize');
const user_game = require('./user_game');
module.exports = (sequelize, DataTypes) => {
  class user_game_biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user_game, {foreignKey:'user_id', as:'user_game'} );
    }
  }
  user_game_biodata.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birthday: DataTypes.DATE,
    gender: DataTypes.STRING,
    location: DataTypes.STRING,
    phone: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_game_biodata',
  });
  return user_game_biodata;
};