'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        firstName: {
          type: Sequelize.STRING(40),
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        username: {
          type: Sequelize.STRING(14),
          allowNull: false,
          unique: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        avatar: {
          type: Sequelize.STRING,
          allowNull: false
        }
      });
    } catch (error) {
      throw erorr;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.dropTable('users');
    } catch (error) {
      throw erorr;
    }
  }
};
