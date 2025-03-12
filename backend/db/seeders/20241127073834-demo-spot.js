'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '1000 4th Ave',
        city: 'Seattle',
        state: 'WA',
        country: 'United States',
        lat: 47.61,
        lng: 122.33,
        name: 'Seattle Central Library',
        description: 'Biggest place of learning in Seattle',
        price: 1.50
      },
      {
        ownerId: 1,
        address: '4701 Great America Pkwy',
        city: 'Santa Clara',
        state: 'CA',
        country: 'United States',
        lat: 37.4,
        lng: 121.97,
        name: "California's Great America",
        description: 'Fun amusement park',
        price: 75.00
      },
      {
        ownerId: 2,
        address: '6000 Universal Blvd',
        city: 'Orlando',
        state: 'FL',
        country: 'United States',
        lat: 28.48,
        lng: 81.47,
        name: "Universal Studios",
        description: 'Another fun amusement park',
        price: 105.00
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2] }
    }, {});
  }
};
