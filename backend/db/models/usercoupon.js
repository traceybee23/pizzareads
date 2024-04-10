'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCoupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserCoupon.init({
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
