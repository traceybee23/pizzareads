'use strict';

const { Coupon } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoCoupons = Array.from({ length: 100 }, (_, i) => ({
  name: 'Free Pizza',
  code: `PIZZA${String(i + 1).padStart(3, '0')}`,
  description: 'Get a free pizza!',
  used: false
}));



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Coupon.bulkCreate(demoCoupons)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Coupons';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,
      { [Op.or]: demoCoupons }, {});
  }
};
