'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      entry_date: {
        type: Sequelize.DATE,
      },
      image: {
        type: Sequelize.STRING,
      },
      position: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      skill: {
        type: Sequelize.STRING
      },
      password_hash: {
        type: Sequelize.STRING
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
