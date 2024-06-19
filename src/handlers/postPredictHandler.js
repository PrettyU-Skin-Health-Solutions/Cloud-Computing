const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');

const postPredictHandler = async (request, h) => {
    const { image } = request.payload;
    const { models } = request.server.app;

    try {
        const results = await predictClassification(models, image); 

        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        const data = {
            "id": id,
            "modelResult": results.label,
            "modelExplanation": results.explanation,
            "modelSuggestion": results.suggestion,
            "modelConfidenceScore": results.confidenceScore,
            "createdAt": createdAt
        };

        const response = h.response({
            status: 'success',
            message: 'Model berhasil diprediksi.',
            data
        });
        response.code(201);
        return response;
    } catch (error) {
        console.error(`Gagal melakukan prediksi: ${error.message}`);
        const response = h.response({
            status: 'fail',
            message: `Gagal melakukan prediksi: ${error.message}`
        });
        response.code(500);
        return response;
    }
};

module.exports = postPredictHandler;
