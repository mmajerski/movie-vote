"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          title: "Action",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Science Fiction",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Thriller",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Animation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Documentary",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Adventure",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Fantasy",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Mystery",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Horror",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Comedy",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Music",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Family",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Crime",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Drama",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Romance",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Horror",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "War",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", null, {});
  }
};
