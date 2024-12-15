'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGrocery extends Model {
    static associate(models) {
      UserGrocery.belongsTo(models.User);
      UserGrocery.belongsTo(models.Grocery);
    }
  }
  UserGrocery.init({
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: "id"
      }
    },
    GroceryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Groceries",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'UserGrocery',
  });
  return UserGrocery;
};