const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    imageData: {
        data: Buffer,
        contentType: String,
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
