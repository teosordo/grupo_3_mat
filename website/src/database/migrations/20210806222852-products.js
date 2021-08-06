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
       /*  categoryId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'categories',
            key: 'id'
          } 
        } */ 
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
          defaultValue: 0
        },
        warranty: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null
        },
        /* imagesId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'images',
            key: 'id'
          }
        }, */
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
