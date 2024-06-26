'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BookProgress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BookProgress.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE' // Optional: Configure cascade delete behavior
      });

      // // Associate with Books
      // BookProgress.belongsTo(models.Books, {
      //   foreignKey: 'bookId',
      //   onDelete: 'CASCADE' // Optional: Configure cascade delete behavior
      // });

      BookProgress.belongsTo(models.Friend, { foreignKey: 'userId' });
    }
  }
  BookProgress.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bookId: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    pagesRead: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    title: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    publicationDate: {
      type: DataTypes.STRING(1000),
    },
    isbn: {
      type: DataTypes.STRING(1000),
    },
    coverImageUrl: {
      type: DataTypes.STRING(1000),
    },
    totalPages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'BookProgress',
  });
  return BookProgress;
};
