'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
  Admin.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};