'use strict';

const { BookProgress } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoBookProgress = [
  {
    "userId": 1,
    "bookId": "wrOQLV6xB-wC",
    "pagesRead": 309,
    "completed": true,
    "title": "Harry Potter and the Sorcerer's Stone",
    "author": "J.K. Rowling",
    "genre": "General | Fantasy & Magic | Wizards & Witches | Boarding School & Prep School | Contemporary | Action & Adventure | School & Education",
    "publicationDate": "2015-12-08",
    "isbn": "1781100489, 9781781100486",
    "coverImageUrl": "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72no3lnarBW49Y9ENVEoGcmKMxEz1t_75ubVueMYGoPUV4CHQPezvzUJvrGE4sXTL7JLYOh4cvSIWGecIfW7FhlGxvOOtap16-HNkOnOXLdGpSo45r1H6Cz-t9QZUMppcbKxo6p&source=gbs_api",
    "totalPages": 309
  },
  {
    "userId": 1,
    "bookId": "5iTebBW-w7QC",
    "pagesRead": 341,
    "completed": true,
    "title": "Harry Potter and the Chamber of Secrets",
    "author": "J.K. Rowling",
    "genre": "General | Fantasy & Magic | Wizards & Witches | Boarding School & Prep School | Contemporary | Action & Adventure | School & Education",
    "publicationDate": "2015-12-08",
    "isbn": "1781100500, 9781781100509",
    "coverImageUrl": "http://books.google.com/books/content?id=5iTebBW-w7QC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70fiqpK10bktwkU-AbJtrofSN7h77R4vfSYCQL5HnlDw9KKzHBhs-7iAwu6Mj8EOUa8TgLKFzfWWXzkSEb2ObSvDBtA3eDOiXIHfPmxx0rlrgIpJCXpc2VSbsbs6j-KhVH5HtrI&source=gbs_api",
    "totalPages": 341
  },
  {
    "userId": 1,
    "bookId": "Sm5AKLXKxHgC",
    "pagesRead": 448,
    "completed": true,
    "title": "Harry Potter and the Prisoner of Azkaban",
    "author": "J.K. Rowling",
    "genre": "General | Fantasy & Magic | Wizards & Witches | Boarding School & Prep School | Contemporary | Action & Adventure | School & Education",
    "publicationDate": "2015-12-08",
    "isbn": "1781100519, 9781781100516",
    "coverImageUrl":  "http://books.google.com/books/content?id=Sm5AKLXKxHgC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71xCPwcegHrWGaSmBxu955iuy_j1U4aMRMVLusP6w8mhr9kd5K9ioHNWUf-Mi0HgJAmRSZ-KzrdEsy4xOyOsN5CoZZzg6AuVGdkkx4C9ajyioPjcleCWyp8ixXfKLW6y4xbVBCt&source=gbs_api",
    "totalPages": 448
  },
  {
    "userId": 1,
    "bookId": "4xsDEQAAQBAJ",
    "pagesRead": 432,
    "completed": true,
    "title": "A Court of Thorns and Roses",
    "author": "Sarah J. Maas",
    "genre": "General | Epic | Romance | Fantasy | Love & Romance | Girls & Women",
    "publicationDate": "2015-05-05",
    "isbn": "1619634449, 9781619634442",
    "coverImageUrl":  "http://books.google.com/books/publisher/content?id=4xsDEQAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72kTa1pAmYFGhbpgTxA1jJJOVfMg3CWBJRajnlyQhvkfELPJs12NB7cheu37Hx9b5s8hukOzkmIMCy56ORMAw-Ca2pIX1l6GtCiN_EjFCs50CZagtGpf_HEJ5_it4jy1s45OZsF&source=gbs_api",
    "totalPages": 432
  },
  {
    "userId": 1,
    "bookId": "_kuOCgAAQBAJ",
    "pagesRead": 432,
    "completed": true,
    "title": "A Court of Mist and Fury",
    "author": "Sarah J. Maas",
    "genre": "Romance | Fantasy | Epic | Contemporary",
    "publicationDate": "2016-05-03",
    "isbn": "1619634473, 9781619634473",
    "coverImageUrl":  "http://books.google.com/books/publisher/content?id=_kuOCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE723TvVGEeqmoRUyZya0degFO3rY1P-cR62bKPFSnMqMo93DfzC14jRUxYLk5h-9uW78-wyJfrZpuIekrEEHazsvgrYYhPd0fMqbW_g78ktKS6A27vntawQPOgIfuRCX4X_nvqVk&source=gbs_api",
    "totalPages": 432
  },
  {
    "userId": 4,
    "bookId": "wrOQLV6xB-wC",
    "pagesRead": 200,
    "completed": false,
    "title": "Harry Potter and the Sorcerer's Stone",
    "author": "J.K. Rowling",
    "genre": "General | Fantasy & Magic | Wizards & Witches | Boarding School & Prep School | Contemporary | Action & Adventure | School & Education",
    "publicationDate": "2015-12-08",
    "isbn": "1781100489, 9781781100486",
    "coverImageUrl": "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72no3lnarBW49Y9ENVEoGcmKMxEz1t_75ubVueMYGoPUV4CHQPezvzUJvrGE4sXTL7JLYOh4cvSIWGecIfW7FhlGxvOOtap16-HNkOnOXLdGpSo45r1H6Cz-t9QZUMppcbKxo6p&source=gbs_api",
    "totalPages": 309
  },
  {
    "userId": 4,
    "bookId": "4xsDEQAAQBAJ",
    "pagesRead": 432,
    "completed": true,
    "title": "A Court of Thorns and Roses",
    "author": "Sarah J. Maas",
    "genre": "General | Epic | Romance | Fantasy | Love & Romance | Girls & Women",
    "publicationDate": "2015-05-05",
    "isbn": "1619634449, 9781619634442",
    "coverImageUrl":  "http://books.google.com/books/publisher/content?id=4xsDEQAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72kTa1pAmYFGhbpgTxA1jJJOVfMg3CWBJRajnlyQhvkfELPJs12NB7cheu37Hx9b5s8hukOzkmIMCy56ORMAw-Ca2pIX1l6GtCiN_EjFCs50CZagtGpf_HEJ5_it4jy1s45OZsF&source=gbs_api",
    "totalPages": 432
  },
  {
    "userId": 4,
    "bookId": "_kuOCgAAQBAJ",
    "pagesRead": 100,
    "completed": false,
    "title": "A Court of Mist and Fury",
    "author": "Sarah J. Maas",
    "genre": "Romance | Fantasy | Epic | Contemporary",
    "publicationDate": "2016-05-03",
    "isbn": "1619634473, 9781619634473",
    "coverImageUrl":  "http://books.google.com/books/publisher/content?id=_kuOCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE723TvVGEeqmoRUyZya0degFO3rY1P-cR62bKPFSnMqMo93DfzC14jRUxYLk5h-9uW78-wyJfrZpuIekrEEHazsvgrYYhPd0fMqbW_g78ktKS6A27vntawQPOgIfuRCX4X_nvqVk&source=gbs_api",
    "totalPages": 432
  },
  {
    "userId": 7,
    "bookId": "6dt_DwAAQBAJ",
    "pagesRead": 448,
    "completed": true,
    "title": "Ninth House",
    "author": "Leigh Bardugo",
    "genre": "Supernatural | Paranormal | Occult & Supernatural",
    "publicationDate": "2019-10-08",
    "isbn": "1250313082, 9781250313089",
    "coverImageUrl":  "http://books.google.com/books/publisher/content?id=6dt_DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72jR8JgPz1_yMKZbq2pwYZq5Dg07LPiNMTwTEQc6kvVl6HeNW0UambyVD_bfjnmxhTX4ua7BoVd9U9-L9jTa5o8td57i3m2ZXlS9iVL4vbnpa0hcwn3iVG2mcCgxf7XIdc4Ra4y&source=gbs_api",
    "totalPages": 448
  },
  {
    "userId": 8,
    "bookId": "I-lMBgrnJi8C",
    "pagesRead": 304,
    "completed": true,
    "title": "Practical Magic",
    "author": "Alice Hoffman",
    "genre": "Literary | Women | Contemporary",
    "publicationDate": "2003-08-05",
    "isbn": "1440673756, 9781440673757",
    "coverImageUrl":  "http://books.google.com/books/content?id=I-lMBgrnJi8C&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72ZvwvJfO_yYr-KD_dBhOqOMinasx4yqp0rMBlFgMSANEOP2jBYxEp-U-Boc-1lvO2NMWDVDMP_5_J9smx-CkQEEzqVFolGqr_0LPeLDkNw1L4kLdqyjvoEbO1MSmUzX9v0U_NI&source=gbs_api",
    "totalPages": 304
  },
  {
    "userId": 9,
    "bookId": "I-lMBgrnJi8C",
    "pagesRead": 304,
    "completed": true,
    "title": "Practical Magic",
    "author": "Alice Hoffman",
    "genre": "Literary | Women | Contemporary",
    "publicationDate": "2003-08-05",
    "isbn": "1440673756, 9781440673757",
    "coverImageUrl":  "http://books.google.com/books/content?id=I-lMBgrnJi8C&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72ZvwvJfO_yYr-KD_dBhOqOMinasx4yqp0rMBlFgMSANEOP2jBYxEp-U-Boc-1lvO2NMWDVDMP_5_J9smx-CkQEEzqVFolGqr_0LPeLDkNw1L4kLdqyjvoEbO1MSmUzX9v0U_NI&source=gbs_api",
    "totalPages": 304
  },
  {
    "userId": 10,
    "bookId": "I-lMBgrnJi8C",
    "pagesRead": 304,
    "completed": true,
    "title": "Practical Magic",
    "author": "Alice Hoffman",
    "genre": "Literary | Women | Contemporary",
    "publicationDate": "2003-08-05",
    "isbn": "1440673756, 9781440673757",
    "coverImageUrl":  "http://books.google.com/books/content?id=I-lMBgrnJi8C&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72ZvwvJfO_yYr-KD_dBhOqOMinasx4yqp0rMBlFgMSANEOP2jBYxEp-U-Boc-1lvO2NMWDVDMP_5_J9smx-CkQEEzqVFolGqr_0LPeLDkNw1L4kLdqyjvoEbO1MSmUzX9v0U_NI&source=gbs_api",
    "totalPages": 304
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await BookProgress.bulkCreate(demoBookProgress, { validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'BookProgress';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,
      { [Op.or]: demoBookProgress }, {}
    )
  }
};
