'use strict';
const productsColors = require('../../models/product_color')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products_colors', productsColors.all(), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products_colors', null, {})
  }
};
