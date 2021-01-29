const { User, Vote, sequelize } = require("../models");
const { checkAuth } = require("../helpers/utils");

const addVote = async (parent, { movieId }, context, info) => {
  const userId = checkAuth(context);
  if (userId) {
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Vote,
          as: "votes"
        }
      ]
    });
    if (user.votes.find((vote) => vote.movieId == movieId)) {
      return;
    }
    const newVote = await Vote.create({ userId, movieId });
    return newVote.id;
  }
};

const removeVote = async (parent, { movieId }, context) => {
  const userId = checkAuth(context);
  const vote = await Vote.findOne({ where: { userId, movieId } });
  if (userId && vote && vote.userId === userId) {
    const deleted = await vote.destroy();
    if (deleted) {
      return vote.id;
    }
    throw new Error("Not authorized");
  }
  throw new Error("Vote not found");
};

const voteResolvers = {
  Query: {},
  Mutation: {
    addVote,
    removeVote
  }
};

module.exports = voteResolvers;
