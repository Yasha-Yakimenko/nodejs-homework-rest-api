const { User } = require('../../models/user');
const { createError } = require('../../helpers');

const verifyEmail = async (req, res) => {
  // Беремо verificationToken з параметрів маршруту
  const { verificationToken } = req.params;

  // Шукаємо користувача з таким verificationToken
  const user = await User.findOne({ verificationToken });
  
  // Якщо користувач вже зареєстрований або підтверджений
  if (!user) {
    throw createError(404);
  };
  
  await User.findIdAndUpdate(user._id, { verificationToken: '', verify: true });
  res.json({
    message: 'Verification successful',
  });
};

module.exports = verifyEmail;