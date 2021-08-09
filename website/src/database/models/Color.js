module.exports = (sequelize, dataTypes) => {
    let alias = 'Color';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        }
    };

    let config = {
        timestamps: false,
        deletedAt: false
    };

    const Color = sequelize.define(alias,cols,config);

    Color.associate = (models) => {
        Color.belongsToMany(models.Product, {
            as: 'products',
            through: 'products_colors',
            foreignKey: 'color_id',
            other: 'product_id',
            timestamps: false
        })
    }

    return Color;
}