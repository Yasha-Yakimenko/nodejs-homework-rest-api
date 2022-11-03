const signup = require('./signup');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const setAvatar = require('./setAvatar');
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");


module.exports = {
    signup,
    verifyEmail,
    resendVerifyEmail,
    login,
    getCurrent,
    logout,
    setAvatar,
};