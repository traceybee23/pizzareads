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
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla varius tristique odio in vestibulum. Vestibulum placerat nisl et cursus consequat. Etiam non congue est. Praesent ut nisi non elit pellentesque dignissim. Sed nibh odio, luctus id purus quis, venenatis interdum tellus. Nam aliquam efficitur ipsum id gravida. Nulla maximus fringilla arcu in sodales. Fusce condimentum aliquam diam, vitae consectetur lorem euismod lacinia. Morbi sollicitudin ornare elementum.",
    "stars": 4
  },
  {
    "userId": 3,
    "bookId": 1,
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed lacus sed erat ultrices ultrices ut sed risus. Vestibulum at nisi et arcu semper lobortis et a urna. Nullam sed turpis arcu. Proin aliquam in metus quis faucibus. Quisque vitae dolor diam. Curabitur iaculis efficitur odio eget convallis. Nullam sit amet bibendum metus, eu sagittis dui.",
    "stars": 4
  },
  {
    "userId": 4,
    "bookId": 2,
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tortor sem, volutpat ut est ac, tempor semper est. Nulla gravida lorem ac condimentum ullamcorper. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "stars": 4
  },
  {
    "userId": 5,
    "bookId": 2,
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada est velit, sit amet rutrum velit rhoncus ut. Etiam ut velit a risus varius fermentum ac vitae sapien. Maecenas id diam vulputate, malesuada enim in, dapibus enim. Aenean vehicula neque non congue fermentum.",
    "stars": 5
  },
  {
    "userId": 6,
    "bookId": 3,
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum imperdiet semper. Fusce nec neque quam. Vestibulum pretium dignissim aliquet. Etiam ac ipsum erat. Vestibulum dignissim turpis non lectus varius varius. Integer sollicitudin lacus id ante sagittis molestie.",
    "stars": 5
  },
  {
    "userId": 7,
    "bookId": 4,
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum imperdiet semper. Fusce nec neque quam. Vestibulum pretium dignissim aliquet. Etiam ac ipsum erat. Vestibulum dignissim turpis non lectus varius varius. Integer sollicitudin lacus id ante sagittis molestie.",
    "stars": 5
  },
  {
    "userId": 8,
    "bookId": 5,
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum imperdiet semper. Fusce nec neque quam. Vestibulum pretium dignissim aliquet. Etiam ac ipsum erat. Vestibulum dignissim turpis non lectus varius varius. Integer sollicitudin lacus id ante sagittis molestie.",
    "stars": 5
  },
  {
    "userId": 9,
    "bookId": 6,
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum imperdiet semper. Fusce nec neque quam. Vestibulum pretium dignissim aliquet. Etiam ac ipsum erat. Vestibulum dignissim turpis non lectus varius varius. Integer sollicitudin lacus id ante sagittis molestie.",
    "stars": 5
  },
  {
    "userId": 10,
    "bookId": 1,
    "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula at tellus quis efficitur. Vivamus ut ultricies nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed urna odio, sagittis ac velit in, condimentum semper nibh. Morbi faucibus iaculis neque. Nulla egestas lectus at euismod pulvinar. Mauris at lacus vulputate risus commodo cursus et sit amet magna. Nam posuere pulvinar dolor vitae tristique. Praesent ut metus mattis, mollis sapien vel, cursus mi. Ut imperdiet eget velit sed sagittis. Ut lectus arcu, fermentum ac scelerisque et, venenatis at velit.",
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
