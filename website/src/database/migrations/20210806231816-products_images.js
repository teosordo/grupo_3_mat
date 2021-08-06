'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('products_images', {
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
        image_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model:'Images',
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
      await queryInterface.dropTable('products_images');
    } catch (error) {
      throw error
    }
  }
};
