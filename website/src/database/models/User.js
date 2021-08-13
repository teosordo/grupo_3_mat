module.exports = (sequelize, dataTypes) => {
    let alias = 'User'
    let cols = {
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
    let config = {
        timestamps: false,
        deletedAt: false,
    }
    const User = sequelize.define(alias,cols,config)
    
    return User
}