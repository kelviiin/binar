'use strict';
const {
  Model
} = require('sequelize');
const user_game = require('./user_game');
module.exports = (sequelize, DataTypes) => {
  class user_game_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user_game, {foreignKey:'user_id'});
    }
  }
  user_game_history.init({
    date: DataTypes.DATE,
    score: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_game_history',
  });
  return user_game_history;
};