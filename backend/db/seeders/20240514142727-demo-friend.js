'use strict';

const { Friend } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoFriends = [
  {
    userId1: 1,
    userId2: 2,
    status: 'friends'
  },
  {
    userId1: 1,
    userId2: 3,
    status: null
  },
  {
    userId1: 1,
    userId2: 4,
    status: 'friends'
  },
  {
    userId1: 1,
    userId2: 5,
    status: 'friends'
  },
  {
    userId1: 2,
    userId2: 3,
    status: 'friends'
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Friend.bulkCreate(demoFriends)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Friends';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,
      { [Op.or]: demoFriends }, {});
  }
};
