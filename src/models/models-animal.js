const Joi = require("joi");

const animalSchema = Joi.object(
    {
        name: Joi.string().min(3).required(),

        species: Joi.string().min(3).required(),

        age: Joi.number().integer().min(0).required()   
    }
);

module.exports = animalSchema;