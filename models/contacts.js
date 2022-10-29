const { Schema, model } = require("mongoose");
const Joi = require('joi');

const contactsAddSchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
  }),

  phone: Joi.string().required(),

  favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  add: contactsAddSchema,
  updateFavorite: contactUpdateFavoriteSchema,
}

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = {Contact, schemas};