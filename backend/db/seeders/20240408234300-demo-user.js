'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: 'Demo',
        lastName: 'Lition',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')

      },
      {
        firstName: 'User1',
        lastName: 'Fakey',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'User2',
        lastName: 'Faker',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Tracey',
        lastName: 'Beard',
        email: 'tracey@user.io',
        username: 'Tracey',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Ruby',
        lastName: 'Gunner',
        email: 'Ruby@user.io',
        username: 'Ruby',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Art',
        lastName: 'Sellers',
        email: 'art@user.io',
        username: 'ArtS',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Ethel',
        lastName: 'Blevins',
        email: 'ethel@user.io',
        username: 'Ethel',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Greg',
        lastName: 'Stevens',
        email: 'greg@user.io',
        username: 'Greg',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Corinne',
        lastName: 'Murray',
        email: 'corinne@user.io',
        username: 'corinne',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Terry',
        lastName: 'Strickland',
        email: 'terry@user.io',
        username: 'terry',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'Tracey', 'Ruby', 'ArtS', 'Ethel', 'Greg', 'corinne', 'terry'] }
    }, {});
  }
};
