'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      player_1_id: {
        type: Sequelize.INTEGER
      },
      player_2_id: {
        type: Sequelize.INTEGER
      },
      player_1_hands: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      player_2_hands: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      result: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');
  }
};