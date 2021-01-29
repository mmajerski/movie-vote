const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, Category, Movie, Vote } = require("../models");
const { checkAuth } = require("../helpers/utils");

const APP_SECRET = "asdiaoshdjr0q39jd0j";

const currentUser = async (parent, args, context, info) => {
  const userId = checkAuth(context);
  if (userId) {
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Vote,
          as: "votes",
          include: [
            {
              model: Movie,
              as: "movie",
              include: [
                {
                  model: Category,
                  as: "category"
                }
              ]
            }
          ]
        }
      ]
    });

    return user;
  }

  throw new Error("User not found");
};

const signUp = async (parent, { username, email, password }) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: passwordHash
    });
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email
    };
    const token = jwt.sign(payload, APP_SECRET);
    return { user, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

const signIn = async (parent, { username, email, password }) => {
  try {
    if (username || email) {
      const user = username
        ? await User.findOne({ where: { username } })
        : await User.findOne({ where: { email } });
      if (await bcrypt.compare(password, user.dataValues.password)) {
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email
        };
        const token = jwt.sign(payload, APP_SECRET);
        return { user, token };
      }

      throw new Error("Invalid credentials");
    }

    throw new Error("Invalid credentials");
  } catch (error) {
    throw new Error(error.message);
  }
};

const authResolvers = {
  Query: {
    currentUser
  },
  Mutation: {
    signUp,
    signIn
  }
};

module.exports = authResolvers;
