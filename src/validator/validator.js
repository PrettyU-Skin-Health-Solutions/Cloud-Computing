const Joi = require('joi');

const registerPayload = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const loginPayload = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = {
    registerPayload,
    loginPayload,
};
