'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('products', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        brand_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'brands',
            key: 'id'
          }
        },
        category_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'categories',
            key: 'id'
          } 
        },
        price: {
          type: Sequelize.DECIMAL,
          allowNull: false
        },
        stock: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        discount: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null
        },
        warranty: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null
        }, 
        video: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        characteristics: {
          type: Sequelize.STRING(),
          allowNull: false
        },
        specs: {
          type: Sequelize.STRING(),
          allowNull: false
        }
      });
    } catch (error) {
        throw error
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.dropTable('products');
    } catch (error) {
      throw error
    }
  }
};
