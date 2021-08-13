'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('carts_products', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        cart_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model:'Carts',
            key: 'id'
          }
        },
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model:'Products',
            key: 'id'
          }
        },
        products_price: {
          type: Sequelize.DECIMAL,
          allowNull: false
        }
      });
    } catch (error) {
      throw error
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.dropTable('carts_products');
    } catch (error) {
      throw error
    }
  }
};
