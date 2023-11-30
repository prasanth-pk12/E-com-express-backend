const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const upload = require('../config/multerConfig');
const Product = require('../models/product');

// Payload validation middleware
const validateProductPayload = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
];

// Image validation middleware
const validateImage = (req, res, next) => {
  // Check if an image file is present
  if (!req.file) {
    return res.status(400).json({ error: 'Image is required' });
  }

  // Check if the image has a valid MIME type
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedImageTypes.includes(req.file.mimetype)) {
    return res.status(400).json({ error: 'Invalid image format' });
  }

  // Continue to the next middleware if image is valid
  next();
};

// Product addition route
router.post('/add', upload.single('image'), validateProductPayload, validateImage, async (req, res) => {
  try {
    // Check for payload validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract data from the request body and uploaded image
    const { name, description, price } = req.body;
    const imageData = req.file;

    // Create a new product instance
    const newProduct = new Product({
      name,
      description,
      price,
      imageData: {
        data: imageData.buffer,
        contentType: imageData.mimetype,
      },
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Respond with success message and saved product data
    res.status(201).json({ message: 'Product added', status: 201, data: savedProduct });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
