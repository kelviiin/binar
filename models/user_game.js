'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

    static #hash = (password) => {
      return bcrypt.hashSync(password, 10)
    }

    static register = ({ username , password }) => {
      const hashedPassword = this.#hash(password);
      return this.create({
        username,
        password: hashedPassword,
      });
    }

    checkPassword = (password) =>{
      return bcrypt.compareSync(password,this.password);
    }

    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username,
      };

      return jwt.sign(payload, "secret-key");
    }

    static authenticate = async ({username,password}) =>{
      try {
        const user = await this.findOne({where:{username}});
        if(!user){
          return Promise.reject("user not found");
        }
        const isPasswordValid = user.checkPassword(password);
        if(!isPasswordValid){
          return Promise.reject("Password invalid");
        }
      return Promise.resolve(user);
      } catch (error) {
        return Promise.reject(error);
      }
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