// import of users model and auth
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    // code for single user
    me: async () => (user, args) => {
      return User.findOne({
        $or: [
          { _id: user ? user._id : args.id },
          { username: args.username }
        ],
      })
    }
  },
  Mutation: {
    // crate user
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },
    // login (user)
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No User with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    // and book to user / change params to DEFS
    // CHANGE PARAMS TO DEFS
    addBook: async (parent, { userId, bookId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { savedBooks: bookId },
        },
        {
          new: true,
        }
      );
    },
    // will remove book from 'savedBooks'
    removeBook: async (parent, { userId, bookId }) => {
      return Profile.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: bookId } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
