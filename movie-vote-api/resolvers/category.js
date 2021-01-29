const { Category } = require("../models");

const categories = async (parent, args, context, info) => {
  const categories = await Category.findAll({ where: {} });
  return categories;
};

const categoryResolver = {
  Query: {
    categories
  },
  Mutation: {}
};

module.exports = categoryResolver;
