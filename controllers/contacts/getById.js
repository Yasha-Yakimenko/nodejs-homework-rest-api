const { Contact } = require('../../models/contacts');
const createError = require('../../helpers');

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findById(contactId, "name email phone favorite");
        // const result = await Contact.findOne({_id: contactId});
        if (!result) {
            throw createError(404);
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};

module.exports = getById;