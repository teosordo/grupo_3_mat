module.exports = (sequelize, dataTypes) => {
    let alias = 'Brand';
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

    const Brand = sequelize.define(alias,cols,config);

    Brand.associate = (models) => {
        Brand.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'brand_id'
        })
    }

    return Brand;
}