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
        user_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model:'Users',
            key: 'id'
          }
        },
        products_price: {
          type: Sequelize.DECIMAL,
          allowNull: false
        },
        products_amount: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        total: {
          type: Sequelize.DECIMAL,
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
