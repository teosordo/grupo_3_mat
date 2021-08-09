'use strict';
const brands = require('../../models/brand')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('brands', brands.all(), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('brands', null, {})
  }
};
