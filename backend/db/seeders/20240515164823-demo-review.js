'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoReviews = [
  {
    "userId": 1,
    "bookId": "wrOQLV6xB-wC",
    "coverImageUrl": "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72no3lnarBW49Y9ENVEoGcmKMxEz1t_75ubVueMYGoPUV4CHQPezvzUJvrGE4sXTL7JLYOh4cvSIWGecIfW7FhlGxvOOtap16-HNkOnOXLdGpSo45r1H6Cz-t9QZUMppcbKxo6p&source=gbs_api",
    "review": "This was an awesome book! I loved it so much.",
    "stars": 5
  },
  {
    "userId": 2,
    "bookId": "wrOQLV6xB-wC",
    "coverImageUrl": "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72no3lnarBW49Y9ENVEoGcmKMxEz1t_75ubVueMYGoPUV4CHQPezvzUJvrGE4sXTL7JLYOh4cvSIWGecIfW7FhlGxvOOtap16-HNkOnOXLdGpSo45r1H6Cz-t9QZUMppcbKxo6p&source=gbs_api",
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sollicitudin mi mauris, vel ultrices libero vehicula consectetur. Sed pharetra integer.",
    "stars": 4
  },
  {
    "userId": 3,
    "bookId": "wrOQLV6xB-wC",
    "coverImageUrl": "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72no3lnarBW49Y9ENVEoGcmKMxEz1t_75ubVueMYGoPUV4CHQPezvzUJvrGE4sXTL7JLYOh4cvSIWGecIfW7FhlGxvOOtap16-HNkOnOXLdGpSo45r1H6Cz-t9QZUMppcbKxo6p&source=gbs_api",
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In posuere leo nunc, eu placerat neque sodales in. Donec in massa libero lectus.",
    "stars": 4
  },
  {
    "userId": 4,
    "bookId": "4xsDEQAAQBAJ",
    "coverImageUrl":  "http://books.google.com/books/publisher/content?id=4xsDEQAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72kTa1pAmYFGhbpgTxA1jJJOVfMg3CWBJRajnlyQhvkfELPJs12NB7cheu37Hx9b5s8hukOzkmIMCy56ORMAw-Ca2pIX1l6GtCiN_EjFCs50CZagtGpf_HEJ5_it4jy1s45OZsF&source=gbs_api",
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tortor sem, volutpat ut est ac, tempor semper est. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "stars": 4
  },
  {
    "userId": 5,
    "bookId": "4xsDEQAAQBAJ",
    "coverImageUrl":  "http://books.google.com/books/publisher/content?id=4xsDEQAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72kTa1pAmYFGhbpgTxA1jJJOVfMg3CWBJRajnlyQhvkfELPJs12NB7cheu37Hx9b5s8hukOzkmIMCy56ORMAw-Ca2pIX1l6GtCiN_EjFCs50CZagtGpf_HEJ5_it4jy1s45OZsF&source=gbs_api",
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in metus non ex posuere faucibus. Sed ornare fringilla nisi quis venenatis. Proin sit amet odio id leo euismod consequat. Ut lectus.",
    "stars": 5
  },
  {
    "userId": 6,
    "bookId": "4xsDEQAAQBAJ",
    "coverImageUrl":  "http://books.google.com/books/publisher/content?id=4xsDEQAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72kTa1pAmYFGhbpgTxA1jJJOVfMg3CWBJRajnlyQhvkfELPJs12NB7cheu37Hx9b5s8hukOzkmIMCy56ORMAw-Ca2pIX1l6GtCiN_EjFCs50CZagtGpf_HEJ5_it4jy1s45OZsF&source=gbs_api",
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in metus non ex posuere faucibus. Sed ornare fringilla nisi quis venenatis. Proin sit amet odio id leo euismod consequat. Ut lectus.",
    "stars": 5
  },
  {
    "userId": 7,
    "bookId": "6dt_DwAAQBAJ",
    "coverImageUrl":  "http://books.google.com/books/publisher/content?id=6dt_DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72jR8JgPz1_yMKZbq2pwYZq5Dg07LPiNMTwTEQc6kvVl6HeNW0UambyVD_bfjnmxhTX4ua7BoVd9U9-L9jTa5o8td57i3m2ZXlS9iVL4vbnpa0hcwn3iVG2mcCgxf7XIdc4Ra4y&source=gbs_api",
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in metus non ex posuere faucibus. Sed ornare fringilla nisi quis venenatis. Proin sit amet odio id leo euismod consequat. Ut lectus.",
    "stars": 5
  },
  {
    "userId": 8,
    "bookId": "I-lMBgrnJi8C",
    "coverImageUrl": "http://books.google.com/books/content?id=I-lMBgrnJi8C&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71K7t08WYbWsKNAsct7oe7rkeOWbOABIBZcDRxwe-xMHy-QD5sy8MVb19rN3AaV0U0s-vO1P1xdEkyghsflqt5MCXXhJqb9y2ypYwcc8kwy-M7VtEx4_zW1YpaEGLGHirxeBdWz&source=gbs_api",
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in metus non ex posuere faucibus. Sed ornare fringilla nisi quis venenatis. Proin sit amet odio id leo euismod consequat. Ut lectus.",
    "stars": 5
  },
  {
    "userId": 9,
    "bookId": "I-lMBgrnJi8C",
    "coverImageUrl": "http://books.google.com/books/content?id=I-lMBgrnJi8C&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71K7t08WYbWsKNAsct7oe7rkeOWbOABIBZcDRxwe-xMHy-QD5sy8MVb19rN3AaV0U0s-vO1P1xdEkyghsflqt5MCXXhJqb9y2ypYwcc8kwy-M7VtEx4_zW1YpaEGLGHirxeBdWz&source=gbs_api",
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in metus non ex posuere faucibus. Sed ornare fringilla nisi quis venenatis. Proin sit amet odio id leo euismod consequat. Ut lectus.",
    "stars": 5
  },
  {
    "userId": 10,
    "bookId": "I-lMBgrnJi8C",
    "coverImageUrl": "http://books.google.com/books/content?id=I-lMBgrnJi8C&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71K7t08WYbWsKNAsct7oe7rkeOWbOABIBZcDRxwe-xMHy-QD5sy8MVb19rN3AaV0U0s-vO1P1xdEkyghsflqt5MCXXhJqb9y2ypYwcc8kwy-M7VtEx4_zW1YpaEGLGHirxeBdWz&source=gbs_api",
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
