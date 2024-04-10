'use strict';

const { Coupon } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Coupon.bulkCreate([
      {
        name: 'Free Pizza',
        code: 'PIZZA123',
        description: 'Get a free pizza!'
      },
      {
        name: 'Free Pizza',
        code: 'PIZZA456',
        description: 'Get a free pizza!'
      },
      {
        name: 'Free Pizza',
        code: 'PIZZA789',
        description: 'Get a free pizza!'
      },
      {
        name: 'Free Pizza',
        code: 'PIZZA987',
        description: 'Get a free pizza!'
      },
      {
        name: 'Free Pizza',
        code: 'PIZZA654',
        description: 'Get a free pizza!'
      },
      {
        name: 'Free Pizza',
        code: 'PIZZA321',
        description: 'Get a free pizza!'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Coupons';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      code: { [Op.in]: ['PIZZA123', 'PIZZA456', 'PIZZA789', 'PIZZA987', 'PIZZA654', 'PIZZA321'] }
    }, {});
  }
};
