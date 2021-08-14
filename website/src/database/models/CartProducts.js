const Cart = require("./Cart");

module.exports = (sequelize, dataTypes) => {
    let alias = 'CartProducts';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cart_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        products_price: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        products_amount: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    };

    let config = {
        timestamps: false,
        deletedAt: false,
        underscored: true
    };

    const CartProducts = sequelize.define(alias,cols,config);

    CartProducts.associate = (models) => {
        CartProducts.belongsTo(models.User,{
            as:"cart",
            foreignKey: 'cart_id'
        });

        CartProducts.belongsTo(models.Product,{
            as:"products",
            foreignKey: 'product_id',
        });
    }


    return CartProducts;
}