'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserCoupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserCoupon.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE' // Optional: Configure cascade delete behavior
      });

      // Associate with Books
      UserCoupon.belongsTo(models.Coupon, {
        foreignKey: 'couponId',
        onDelete: 'CASCADE' // Optional: Configure cascade delete behavior
      });
    }
  }

  UserCoupon.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    couponId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    redeemedDate: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'UserCoupon',
  });
  return UserCoupon;
};
