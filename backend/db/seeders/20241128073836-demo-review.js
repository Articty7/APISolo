'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        review: "There's so much book",
        stars: 3,
      },
      {
        spotId: 1,
        userId: 3,
        review: "Book-tastic!",
        stars: 4
      },
      {
        spotId: 3,
        userId: 1,
        review: 'Rollercoasters are so cool!',
        stars: 5
      },
      {
        spotId: 3,
        userId: 3,
        review: "I've seen better",
        review: 2
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
