'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('cart_products', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        cart_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model:'carts',
            key: 'id'
          }
        },
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model:'products',
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
