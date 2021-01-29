"use strict";

const prepareData = require("../helpers/moviesData");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const movies = await prepareData();

    await queryInterface.bulkInsert("Movies", movies, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Movies", null, {});
  }
};
