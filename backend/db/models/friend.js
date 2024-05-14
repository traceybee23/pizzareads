'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Friend.belongsTo(models.User, {
        foreignKey: 'userId1',
        onDelete: 'CASCADE'
      });
      Friend.belongsTo(models.User, {
        foreignKey: 'userId2',
        onDelete: 'CASCADE' 
      });
    }
  }
  Friend.init({
    userId1: DataTypes.INTEGER,
    userId2: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Friend',
  });
  return Friend;
};
