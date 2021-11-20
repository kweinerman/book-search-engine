
const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
    Query: {
      Users: async () => {
        return User.find();
      },
  
      User: async (parent, { userId }) => {
        return User.findOne({ _id: userId });
      },
      // By adding context to our query, we can retrieve the logged in user without specifically searching for them
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id })
          .populate('savedBooks')
          .select('-password')
        };
        throw new AuthenticationError('You need to be logged in!');
      },
    },


Mutation: {

    addUser: async (parent, args, context) => {
      const user = await User.create(username, email, password);
      const token = signToken(user);
      return { token, user };
    },
  
    login: async (parent, args, context) => {
      const user = await User.findOne({ email });
      if (!user) {
        return { message: "User not found" };
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        return { message: "Password or Username incorrect" };
      }
      const token = signToken(user);
      return { token, user };
    },
  

    saveBook: async (parent, args, context) => {
        if (context.user) {
            return User.findOneAndUpdate(
              { _id: userId },
              {
                $addToSet: { savedBooks: args },
              },
              {
                new: true,
                runValidators: true,
              }
            );
           
          }
          // If user attempts to execute this mutation and isn't logged in, throw an error
          throw new AuthenticationError('You need to be logged in!');
        },
    // remove a book from `savedBooks`
    removeBook: async (parent, args, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        return { message: "You musty be logged in" };
      }
      return updatedUser;
    },
  },
};
module.exports = resolvers;