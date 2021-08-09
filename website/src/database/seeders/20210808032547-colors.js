'use strict';
const colors = require('../../models/color')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('colors', colors.all(), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('colors', null, {})
  }
};
