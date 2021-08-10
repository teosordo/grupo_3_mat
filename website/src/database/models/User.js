module.exports = (sequelize, dataTypes) => {
    const alias = 'User';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          firstName: {
            type: dataTypes.STRING,
            allowNull: false
          },
          lastName: {
            type: dataTypes.STRING,
            allowNull: false
          },
          username: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
          },
          email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
          },
          password: {
            type: dataTypes.STRING,
            allowNull: false
          },
          avatar: {
            type: dataTypes.STRING,
            allowNull: false
          }
    };
    const config = {
        timestamps: false,
        deletedAt: false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = models => {
        /* User.hasMany(models.Cart, {
            as: 'carts',
            foreignKey: 'user_id'
        });

        User.hasMany(models.Purchase, {
            as: 'purchases',
            foreignKey: 'user_id'
        }); */
    }

    return User;
}