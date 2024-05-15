'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoReviews = [
  {
    "userId": 1,
    "bookId": 1,
    "review": "This was an awesome book! I loved it so much.",
    "stars": 5
  },
  {
    "userId": 2,
    "bookId": 1,
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sollicitudin mi mauris, vel ultrices libero vehicula consectetur. Sed pharetra integer.",
    "stars": 4
  },
  {
    "userId": 3,
    "bookId": 1,
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In posuere leo nunc, eu placerat neque sodales in. Donec in massa libero lectus.",
    "stars": 4
  },
  {
    "userId": 4,
    "bookId": 2,
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tortor sem, volutpat ut est ac, tempor semper est. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "stars": 4
  },
  {
    "userId": 5,
    "bookId": 2,
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in metus non ex posuere faucibus. Sed ornare fringilla nisi quis venenatis. Proin sit amet odio id leo euismod consequat. Ut lectus.",
    "stars": 5
  },
  {
    "userId": 6,
    "bookId": 3,
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in metus non ex posuere faucibus. Sed ornare fringilla nisi quis venenatis. Proin sit amet odio id leo euismod consequat. Ut lectus.",
    "stars": 5
  },
  {
    "userId": 7,
    "bookId": 4,
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in metus non ex posuere faucibus. Sed ornare fringilla nisi quis venenatis. Proin sit amet odio id leo euismod consequat. Ut lectus.",
    "stars": 5
  },
  {
    "userId": 8,
    "bookId": 5,
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in metus non ex posuere faucibus. Sed ornare fringilla nisi quis venenatis. Proin sit amet odio id leo euismod consequat. Ut lectus.",
    "stars": 5
  },
  {
    "userId": 9,
    "bookId": 6,
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in metus non ex posuere faucibus. Sed ornare fringilla nisi quis venenatis. Proin sit amet odio id leo euismod consequat. Ut lectus.",
    "stars": 5
  },
  {
    "userId": 10,
    "bookId": 1,
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod purus non magna auctor venenatis. Praesent lobortis a sapien et posuere. Maecenas semper orci at urna vestibulum, vel biam.",
    "stars": 2
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate(demoReviews, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,
      { [Op.or]: demoReviews }, {});
  }
};
