'use strict';

const { UserCoupon } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await UserCoupon.bulkCreate([
      {
        userId: 1,
        couponId: 1,
        redeemedDate: null
      },
      {
        userId: 2,
        couponId: 2,
        redeemedDate: null

      },
      {
        userId: 3,
        couponId: 3,
        redeemedDate: null
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'UserCoupons';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
