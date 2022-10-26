const {
    Contact,
    schemas } = require('../../models/contacts');
  const createError = require('../../helpers');
  
  const updateFavorite = async (req, res, next) => {
    try {
      const { error } = schemas.updateFavorite.validate(req.body);
      if (error) {
        throw createError(400, "missing field favorite");
      };
      const { contactId } = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
      if (!result) {
        throw createError(404);
      };
      res.json(result);
    }
    catch (error) {
      next(error);
    }
  };
  
  module.exports = updateFavorite;