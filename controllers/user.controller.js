const userModal = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;
  const isEmailPresent = await userService.authenticateEmail({ email });
  if (isEmailPresent) {
    return res
      .status(400)
      .json({ errors: "User with this email already exist !" });
  }
  const hashPassword = await userModal.hashPassword(password);
  const user = await userService.createUser({
    fullname,
    email,
    password: hashPassword,
  });
  res.status(200).json({ message: "User Registered !" });
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Authenticate the user via the service
    const { token, user } = await userService.authenticateUser({
      email,
      password,
    });

    // Respond with the token and user data
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function for logout
module.exports.logoutUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(400).json({ error: 'Token is required to log out' });
  }

  try {
    // Add the token to the blacklist
    userService.addToBlacklist(token);
    
    // Optionally, you can send a success message and clear the user's session on the frontend
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({ error: 'Something went wrong during logout' });
  }
};
