const bcrypt = require('bcryptjs');
const {
  User,
  schemas } = require('../../models/user');
const createError = require('../../helpers/createError');

const signup = async (req, res, next) => {
  try {
    const { error } = schemas.signup.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    };

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, `Email ${email} in use`);
    };
    
    const hashPassword = await bcrypt.hash(password, 10);

    const result = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  }
  catch (error) {
    next(error);
  }
};

module.exports = signup;