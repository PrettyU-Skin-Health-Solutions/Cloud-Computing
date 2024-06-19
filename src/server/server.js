require('dotenv').config();

const Hapi = require('@hapi/hapi');
const routes = require('../routes/routes');
const loadModels = require('../services/loadModels');
const InputError = require('../exception/InputError');

(async () => {
    try {
        const server = Hapi.server({
            port: 8080,
            host: '0.0.0.0',
            routes: {
                cors: {
                    origin: ['*'],
                },
            },
        });

        const models = await loadModels();
        server.app.models = models;

        server.route(routes);

        server.ext('onPreResponse', function (request, h) {
            const response = request.response;
        
            if (response instanceof InputError) {
                const newResponse = h.response({
                    status: 'fail',
                    message: `${response.message} Silakan gunakan foto lain.`
                });
                newResponse.code(400);
                return newResponse;
            }
        
            if (response.isBoom) {
                const newResponse = h.response({
                    status: 'fail',
                    message: response.message
                });
                const statusCode = response.output.statusCode;
                newResponse.code(statusCode);
                return newResponse;
            }
        
            return h.continue;
        });
        

        await server.start();
        console.log(`Server berjalan pada: ${server.info.uri}`);
    } catch (error) {
        console.error(`Gagal memulai server: ${error.message}`);
        process.exit(1);
    }
})();
