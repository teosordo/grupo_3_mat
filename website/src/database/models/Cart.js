module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        total_products: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        final_price: {
            type: dataTypes.DECIMAL,
            allowNull: true
        },
        purchase_date: {
            type: dataTypes.DATE,
            allowNull: true
        }
    };

    let config = {
        timestamps: false,
        deletedAt: false,
        underscored: true
    };

    const Cart = sequelize.define(alias,cols,config);
    
    Cart.associate = (models) => {
        Cart.belongsTo(models.User,{
            as:"carts",
            foreignKey: 'user_id'
        })

        Cart.hasMany(models.CartProducts,{
            as:"cart_products",
            foreignKey: 'cart_id',
        })
    }

    return Cart;
}