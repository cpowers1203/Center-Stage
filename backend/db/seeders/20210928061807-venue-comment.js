'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('VenueComments', [{
        comment: faker.lorem.sentence(),
        venueId: 9,
        userId: faker.datatype.number({min:1, max:30})
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('VenueComments', null, {});
  }
};
