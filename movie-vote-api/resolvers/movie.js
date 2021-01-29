const { User, Category, Movie, Vote } = require("../models");
const Sequelize = require("sequelize");

const movies = async (parent, args, context, info) => {
  const { categoryId, limit = 10, offset = 0 } = args;
  const movies = await Movie.findAll({
    limit,
    offset,
    order: Sequelize.literal("random()"),
    where: categoryId ? { categoryId } : {},
    include: [
      {
        model: Vote,
        as: "votes",
        include: [
          {
            model: User,
            as: "user"
          }
        ]
      },
      {
        model: Category,
        as: "category"
      }
    ]
  });

  return movies;
};

const movieResolver = {
  Query: {
    movies
  },
  Mutation: {}
};

module.exports = movieResolver;
