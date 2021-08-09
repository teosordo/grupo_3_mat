'use strict';
const images = require('../../models/image')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('images', images.all(), {} )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('images', null, {} )
  }
};
