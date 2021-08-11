module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
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
        },
        detail: {
            type: dataTypes.STRING(1500),
            allowNull: false
        }
    };

    let config = {
        timestamps: false,
        deletedAt: false
    };

    const Category = sequelize.define(alias,cols,config);

    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category_id'
        })
    }

    return Category;
}