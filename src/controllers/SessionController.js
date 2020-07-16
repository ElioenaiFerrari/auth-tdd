const { User } = require("../models");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.checkPasswordIsValid(password))) {
      return res.status(401).send();
    }

    return res.status(200).json({
      user,
      token: user.generateToken(),
    });
  }
}

module.exports = new SessionController();
