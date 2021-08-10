'use strict';

const users = require('../../models/user');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const all = users.all();
    await queryInterface.bulkInsert('users', all, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
