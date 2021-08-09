module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        price: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        discount: {
            type: dataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        warranty: {
            type: dataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }, 
        video: {
            type: dataTypes.STRING,
            allowNull: true,
        },
        characteristics: {
            type: dataTypes.STRING(),
            allowNull: false
        },
        specs: {
            type: dataTypes.STRING(),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        deletedAt: false
    };
    const Product = sequelize.define(alias,cols,config);

    Product.associate = (models) =>{
        Product.belongsToMany(models.Color, {
            as: 'colors',
            through: 'products_colors',
            foreignKey: 'product_id',
            other: 'color_id',
            timestamps: false
        })

        Product.belongsTo(models.Brand, {
            as: "brand",
            foreignKey: "brand_id"
        })

        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
        })

        Product.hasMany(models.Image, {
            as: "images",
            foreignKey: "product_id"
        })
    }

    return Product;
}