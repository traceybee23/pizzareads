'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookProgresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users' }
      },
      bookId: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      pagesRead: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      title: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      genre: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      publicationDate: {
        type: Sequelize.STRING(1000),
      },
      isbn: {
        type: Sequelize.STRING(1000),
      },
      coverImageUrl: {
        type: Sequelize.STRING(1000),
      },
      totalPages: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'BookProgresses';
    await queryInterface.dropTable(options);
  }
};
