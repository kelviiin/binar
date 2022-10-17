'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // static player1Hand = (hand,id)=> {
    //   console.log("player 1 hand");
    //     return this.update({player_1_hands:hand},{where:{id:id}});
    // }

  }
  Room.init({
    name: DataTypes.STRING,
    player_1_id: DataTypes.INTEGER,
    player_2_id: DataTypes.INTEGER,
    player_1_hands: DataTypes.ARRAY(DataTypes.STRING),
    player_2_hands: DataTypes.ARRAY(DataTypes.STRING),
    result: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};