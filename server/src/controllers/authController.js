const authService = require('../services/authService');

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await authService.signup(username, password);
    res.json({ status: true, message: data.message });
  } catch (error) {
    console.error(error);
    res.json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await authService.login(username, password);
    res.json({ status: true, token: data.token, message: data.message });
  } catch (error) {
    console.error(error);
    res.json({ message: error.message });
  }
};
