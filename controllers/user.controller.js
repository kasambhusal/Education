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
