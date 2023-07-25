const express = require('express');
const productRoutes = express.Router();
const ProductController = require('../Controllers/ProductController');
const asyncHandler = require("express-async-handler");
const  ProductModel = require("../models/ProductModel");

const { getAllProducts, getProduct } = require('../data/products');

productRoutes.get('/',async (req, res) => {
  const products = await getAllProducts();
  res.send({ status: 'OK', data: products });
});
//Get a product by id
productRoutes.get('/:productId', async (req, res) => {
  try {
    const product = await getProduct(req.params.productId);

    if (!product) {
      res.status(404).send({ status: 'FAILED', error: 'Product not found' });
      return;
    }

    res.send({ status: 'OK', data: product });
  } catch (e) {
    res.status(401).send({ status: 'FAILED', error: e.message });
  }
});

//Create a new product
productRoutes.post('/', ProductController.createProduct);

//Update a product by id
productRoutes.patch('/:id', ProductController.updateAProduct);


//Delete a product by id
productRoutes.delete('/:id', ProductController.deleteAProduct);

//GET ALL PRODUCTS
/*productRoutes.get('/', async (req, res) => {
  let products = await getAllProducts();
  res.send({ status: 'OK', data: products });
});
*/

productRoutes.get('/:productId', asyncHandler(async  (req, res) => {
  const product = await getProduct(req.params.productId);

  if (!product) {
    res.status(404).send({ status: 'FAILED', error: 'Product not found' });
    return;
  }
  
  res.send({ status: 'OK', data: product });
}));

module.exports = productRoutes;

