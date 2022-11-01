const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
console.log(avatarsDir);

const setAvatar = async (req, res, next) => {
  const { _id } = req.user;
  // беремо поточний шлях аватарки
  const { path: tempPath, originalname } = req.file;

  const newImgName = `${originalname}_${_id}`;
  const avatar = await Jimp.read(tempPath);
  await avatar.resize(250, 250).write(tempPath);
  
  try {
    // переміщуємо аватарку
    const uploudPath = path.join(avatarsDir, newImgName);
    await fs.rename(tempPath, uploudPath);
    // запам’ятовуємо шлях
    const avatarURL = path.join('avatars', newImgName);
    // записуємо шлях в базу
    await User.findByIdAndUpdate(_id, { avatarURL });
    // повертаємо шлях
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempPath);
    next(error);
  }
};

module.exports = setAvatar;