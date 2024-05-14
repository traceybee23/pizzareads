'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {

    static associate(models) {
      // define association here
      Books.belongsToMany(
        models.User,
        {
          through: models.BookProgress,
          foreignKey: 'bookId',
          otherKey: 'userId'
        }
      )

      Books.hasMany(models.BookProgress, { foreignKey: 'bookId' });
    }
  }
  Books.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 256]
      }
    },
    publicationDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 256]
      }
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 13]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 1300]
      }
    },
    coverImageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    totalPages: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};
