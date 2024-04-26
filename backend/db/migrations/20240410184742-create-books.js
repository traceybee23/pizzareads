'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      author: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      genre: {
        allowNull: false,
        type: Sequelize.STRING(256)
      },
      publicationDate: {
        allowNull: false,
        type: Sequelize.STRING(256)
      },
      isbn: {
        allowNull: false,
        type: Sequelize.STRING(13),
        unique: true
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(1300)
      },
      coverImageUrl: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      totalPages: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    options.tableName = "Books";
    await queryInterface.dropTable(options);
  }
};
