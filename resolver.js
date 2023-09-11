import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const resolver = {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
    user: async (_, { id }) => {
      const user = await User.findById(id);
      return user;
    },
  },
  Mutation: {
    createUser: async (_, { signUp }) => {
      const { firstName, lastName, email, password } = signUp;
      const userExist = await User.findOne({ email });
      if (userExist) {
        throw new Error("User already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      await user.save();
      return user;
    },
    login: async (_, { login }) => {
      const { email, password } = login;
      const emailExist = await User.findOne({ email });
      if (!emailExist) {
        throw new Error("Invalid email or password");
      }
      const validPassword = await bcrypt.compare(password, emailExist.password);
      if (!validPassword) {
        throw new Error("Invalid email or password");
      }
      const token = jwt.sign({ id: emailExist._id }, process.env.JWT_SECRET);
      return { token };
    },
  },
};

export default resolver;
