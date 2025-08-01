const User = require('../models/Users');
const bcrypt = require('bcrypt');
const { createAccessToken } = require('../auth');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createAccessToken(user);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed', details: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw Error("Email not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Incorrect password");

    const token = createAccessToken(user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ error: 'Login failed', message: err.message });
  }
};

exports.getUserDetails = (req, res) => {
  res.status(200).json({
    id: req.user.id,
    email: req.user.email
  });
};
