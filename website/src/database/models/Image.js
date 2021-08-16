module.exports = (sequelize, dataTypes) => {
    let alias = 'Image';
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
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        deletedAt: false
    };

    const Image = sequelize.define(alias,cols,config)

    Image.associate = (models) => {
        Image.belongsTo(models.Product,{
            as: 'product',
            foreignKey: 'product_id'
        })
    };

    return Image;
}