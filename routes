const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { validateProduct } = require('../middleware/validateProduct');
const auth = require('../middleware/auth');
const router = express.Router();

let products = [];

// GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// GET a product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST a new product
router.post('/', auth, validateProduct, (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update a product
router.put('/:id', auth, validateProduct, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE a product
router.delete('/:id', auth, (req, res) => {
  products = products.filter(p => p.id !== req.params.id);
  res.status(204).send();
});

module.exports = router;
