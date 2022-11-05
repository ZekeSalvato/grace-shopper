const express = require('express');
const { fetchAllProducts } = require('../db/products')
const productsRouter = express.Router();

const { createProduct, updateProduct, deleteProduct } = require('../db');
// console.log(fetchAllProducts)
// productsRouter.get('/', async (req, res, next) => {
//   try {
//     console.log("await fetchAllProducts()")
//     const products = await fetchAllProducts();
//     console.log(products)
//     res.send(products)
//   }
//   catch (error) {
//     console.log(error)
//     throw error
//   }
// })
productsRouter.get('/', async (req, res, next) => {
  try {
    console.log("above")
      const products = await fetchAllProducts();
      console.log("below")
      res.send(products);
  } catch (error) {
      next(error)
  }
})


module.exports = productsRouter;
