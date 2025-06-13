// middleware.js

const dotenv = require('dotenv');
dotenv.config();

// Combined Middleware Functionality
const middleware = {
  // Request Logger
  logger: (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  },

  // API Key Authentication
  authenticate: (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(401).json({ message: 'Unauthorized - invalid API key' });
    }
    next();
  },

  // Product Validator for POST and PUT
  validateProduct: (req, res, next) => {
    const { name, description, price, category, inStock } = req.body;
    if (
      !name ||
      !description ||
      typeof price !== 'number' ||
      !category ||
      typeof inStock !== 'boolean'
    ) {
      return res.status(400).json({ message: 'Invalid product data' });
    }
    next();
  }
};

module.exports = middleware;
