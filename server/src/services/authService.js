const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.signup = async (username, password) => {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return { message: 'Signup successful. You can now login with your credentials.' };
  } catch (error) {
    throw error;
  }
};

exports.login = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid username or password');
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });

    return { token:token, message:'Login successfull' };
  } catch (error) {
    throw error;
  }
};
