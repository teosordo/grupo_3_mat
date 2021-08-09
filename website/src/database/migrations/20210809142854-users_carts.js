'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('users_carts', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        client_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model:'Users',
            key: 'id'
          }
        },
        cart_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model:'Carts',
            key: 'id'
          }
        }
      });
    } catch (error) {
      throw error
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.dropTable('users_carts');
    } catch (error) {
      throw error
    }
  }
};
