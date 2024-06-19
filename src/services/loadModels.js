const tf = require('@tensorflow/tfjs-node');
require('dotenv').config();

// load models
async function loadModels() {
    try {
        const modelUrl = process.env.MODEL_URL;
        if (!modelUrl) {
            throw new Error('MODEL_URL environment variable is not set');
        }

        console.log(`Loading model from URL: ${modelUrl}`);

        const model = await tf.loadLayersModel(modelUrl);
        console.log('Model loaded successfully');
        return model;
    } catch (error) {
        console.error(`Failed to load models: ${error.message}`);
        throw new Error('Could not load models');
    }
}

module.exports = loadModels;