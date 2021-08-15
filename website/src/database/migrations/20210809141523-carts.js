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
            model:'users',
            key: 'id'
          }
        },
        total_products: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        final_price: {
          type: Sequelize.DECIMAL,
          allowNull: true
        },
        purchase_date: {
          type: Sequelize.DATE,
          allowNull: true
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
