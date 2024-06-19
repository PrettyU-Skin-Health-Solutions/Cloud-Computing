const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exception/InputError');

async function predictClassification(model, image) {
    try {
        // decode gambar dan preprocess
        const tensor = tf.node
            .decodeImage(image, 3)  // decode gambar ke RGB
            .resizeBilinear([224, 224])  // resize image
            .expandDims()  // tambahkan dimensi
            .toFloat();  // ubah ke float

        // normalize gambar
        const normalizedTensor = tensor.div(255.0);

        // prediksi
        const prediction = model.predict(normalizedTensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;

        const classes = ['oily', 'dry', 'normal'];
        const classResult = tf.argMax(prediction, 1).dataSync()[0];
        const label = classes[classResult];

        let explanation, suggestion;

        switch (label) {
            case 'normal':
                explanation = "Tipe kulit Anda adalah normal.";
                suggestion = "Anda dapat menggunakan berbagai jenis produk skincare.";
                break;
            case 'oily':
                explanation = "Tipe kulit Anda adalah berminyak.";
                suggestion = "Gunakan produk skincare yang dapat mengontrol produksi minyak berlebih.";
                break;
            case 'dry':
                explanation = "Tipe kulit Anda adalah kering.";
                suggestion = "Gunakan produk skincare yang dapat memberikan kelembapan ekstra.";
                break;
            default:
                explanation = "Tidak dapat menentukan tipe kulit.";
                suggestion = "Coba unggah gambar lain atau konsultasikan dengan ahli kulit.";
        }

        return { confidenceScore, label, explanation, suggestion };
    } catch (error) {
        console.error(`Prediction failed: ${error.message}`);
        throw new InputError(`Terjadi kesalahan input: ${error.message}`);
    }
}

module.exports = predictClassification;