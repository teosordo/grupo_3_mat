'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('products_colors', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model:'Products',
            key: 'id'
          }
        },
        color_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model:'Colors',
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
      await queryInterface.dropTable('products_colors');
    } catch (error) {
      throw error
    }
  }
};
