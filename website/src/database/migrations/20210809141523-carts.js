'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('carts', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        products_amount: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        total: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        purchase_date: {
          type: Sequelize.DATE,
        }
      });
    } catch (error) {
      throw error
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.dropTable('carts');
    } catch (error) {
      throw error
    }
  }
};
