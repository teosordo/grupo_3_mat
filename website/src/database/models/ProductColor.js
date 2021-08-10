module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductsColor';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        color_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        }
    };

    let config = {
        timestamps: false,
        deletedAt: false,
        underscored: true
    };

    const ProductColor = sequelize.define(alias,cols,config);

    return ProductColor;
}