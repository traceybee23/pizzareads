'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {

    static associate(models) {

      Review.belongsTo(models.User,
        {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        })


    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    bookId: DataTypes.STRING,
    coverImageUrl: DataTypes.STRING(1000),
    review:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: [10, 200], msg: "Review must be between 10 and 200 characters"},
        notNull: {msg: "Review text is required"},
        notEmpty: {msg: "Review text is required"},
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Stars must be an integer from 1 to 5"},
        min: { args: 1, msg: "Stars must be an integer from 1 to 5" },
        max: { args: 5, msg: "Stars must be an integer from 1 to 5" }
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
