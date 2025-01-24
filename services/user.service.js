const userModal = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.createUser = async ({ fullname, email, password }) => {
  if (!fullname || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = userModal.create({
    fullname,
    email,
    password,
  });
  return user;
};

module.exports.authenticateEmail = async ({ email }) => {
  if (!email) {
    throw new Error("Email is required");
  }
  const user = await userModal.findOne({ email });
  if (user) {
    return true;
  } else {
    return false;
  }
};

module.exports.authenticateUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Find the user by email and include the password field
  const user = await userModal.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare the provided password with the stored hash
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate a JWT token
  const token = user.generateAuthToken();

  // Return the token and user data (excluding the password)
  return {
    token,
    user: { _id: user._id, fullname: user.fullname, email: user.email },
  };
};
