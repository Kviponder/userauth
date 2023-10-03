const { User } = require("../models");

const { signToken } = require("../utils/auth");
const { authMiddleware } = require("../utils/auth");

const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    User: async (parent, { _id }) => {
      try {
        return await User.findById({ _id });
      } catch (err) {
        console.log(
          " Faileds to fetch User ::: This is your error ------->",
          err
        );
      }
    },

    Users: async () => {
      try {
        return await User.find({});
      } catch (err) {
        console.log(
          " Faileds to fetch Users ::: This is your error ------->",
          err
        );
      }
    },
    me: async (parent, args, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError("Authentication required.");
      }

      try {
        // Fetch all snippets from the database that belong to the authenticated user
        const snippets = await Snippet.find({ user: context.user._id });

        // Return an object with the snippets data
        return {
          snippets,
        };
      } catch (error) {
        // Handle any potential errors
        throw new Error("An error occurred while fetching snippets.");
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        console.log("Token: ", token);
        return { token, user };
      } catch (err) {
        console.log(
          " Faileds to add User ::: This is your error ------->",
          err
        );
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        const correctPw = await user.isCorrectPassword(password);
        const token = signToken(user);

        if (!user || !correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }
        return { token, user };
      } catch (err) {
        throw new AuthenticationError(`Failed to log in!: ${err}`);
      }
    },
  },
};

module.exports = resolvers;
