'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grocery extends Model {
    static associate(models) {
      User.belongsToMany(models.User, {
        through: 'UserGroceries',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Grocery.init({
    tite: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title is required"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Price is required"
        },
        min: {
          args: [0],
          msg: "Price must be greater than 0!"
        }
      }
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Tag is required"
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "ImageUrl is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Grocery',
  });
  return Grocery;
};