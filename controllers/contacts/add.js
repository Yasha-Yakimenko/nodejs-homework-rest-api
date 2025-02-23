const {
    Contact,
    schemas } = require('../../models/contacts');
  const createError = require('../../helpers');
  
  const add = async (req, res, next) => {
    try {
      const { error } = schemas.add.validate(req.body);
      if (error) {
        throw createError(400, error.message);
      };
      const { id: owner } = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
    }
    catch (error) {
      next(error);
    }
  };
  
  module.exports = add;