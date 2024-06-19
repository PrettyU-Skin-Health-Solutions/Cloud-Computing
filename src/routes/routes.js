const register = require("../handlers/register");
const login = require("../handlers/login");
const postPredictHandler = require("../handlers/postPredictHandler")
const validators = require("../validator/validator");

const routes = [
    {
        method: "POST",
        path: "/register",
        handler: register,
        options: {
            validate: {
                payload: validators.registerPayload,
                failAction: (request, h, err) => {
                    throw err;
                },
            },
        },
    },
    {
        method: "POST",
        path: "/login",
        handler: login,
        options: {
            validate: {
                payload: validators.loginPayload,
                failAction: (request, h, err) => {
                    throw err;
                },
            },
        },
    },
    {
        path: '/predict',
        method: 'POST',
        handler: postPredictHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true
            }
        }
    }
]

module.exports = routes;
