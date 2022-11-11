const express = require('express');
const { fetchAllProducts, getProductById } = require('../db/products')
const productsRouter = express.Router();

const { createProduct, updateProduct, deleteProduct } = require('../db');
console.log(fetchAllProducts)
productsRouter.get('/', async (req, res, next) => {
  try {
    console.log("await fetchAllProducts()")
    const products = await fetchAllProducts();
    console.log(products)
    res.send(products)
  }
  catch (error) {
    console.log(error)
    throw error
  }
})
// remember to add requireAdmin to post
productsRouter.post('/', async (req, res, next) => {
  const { title, description, price } = req.body;
  try {
    const product = await createProduct(title, description, price);
    res.send({ product });
  } catch (error) {
    console.log("Couldn't post products")
    throw error
  }
})
// requireAdmin
productsRouter.patch('/:id', async (req, res, next) => {
  const { productId } = req.params; 
  const { title, description, price} = req.body;
  try {
    const product = await getProductById(productId);
    const updatedProduct = await updateProduct({productId, title, description, price });
      res.send(updatedProduct)
  } catch(error){
    console.log("Couldn't udpate product")
    throw error
  }})

// requireAdmin
productsRouter.delete('/:id', async (req, res, next) => {
  if (!req.user.isAdmin){
    res.send({error: "Not Authorized for user"});
    return;
  }
  const { productId } = req.params
  try {
    const deletedProduct = await deleteProduct(productId)
    return deletedProduct;
  } catch (error) {
    console.log("couldn't delete product")
    throw error
  }
})










module.exports = productsRouter;
