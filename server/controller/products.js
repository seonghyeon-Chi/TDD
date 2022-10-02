const productModel = require('../model/Product');

const createProduct = async (req, res, nest) => {
  const createdProduct = await productModel.create(req.body);
  console.log('createdProduct', createdProduct)
  return res.status(201).json(createdProduct);
}

module.exports = {createProduct}