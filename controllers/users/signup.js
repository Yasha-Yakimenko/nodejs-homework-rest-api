const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const {
  User,
  schemas } = require('../../models/user');
  const {createError, sendEmail} = require('../../helpers');

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
    const avatarURL = gravatar.url(email);

     // створюємо токен верифікації
     const verificationToken = nanoid()

    const result = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });

     // створюємо email для відправки
     const mail = {
      to: email,
      subject: 'Confirmation of registration',
      html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verificationToken}'>Сlick to confirm your registration on the site</a>`,
    };
    
    // відправляємо лист
    await sendEmail(mail);


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