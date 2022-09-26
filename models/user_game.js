'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.user_game_biodata, {foreignKey:'user_id', as:'user_game_biodata'} );
      this.hasMany(models.user_game_history, {foreignKey:'user_id', as:'user_game_history'} );
    }
  }
  user_game.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_game',
  });
  return user_game;
};