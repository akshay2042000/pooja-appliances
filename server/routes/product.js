const express = require('express');
const router = express.Router();
const { getProducts, postProduct, getProductById, updateProductById, deleteProductById, deleteProducts, getSearchedProducts } = require('../controllers/product');

const { forbiddenGet, forbiddenPost, forbiddenPut, forbiddenDelete } = require('../controllers/forbiddenController');


router.route('/')
    .get(getProducts)
    .post(postProduct)
    .put(forbiddenPut)
    .delete(deleteProducts)

router.route('/search')
    .get(getSearchedProducts)

router.route('/:id')
    .get(getProductById)
    .post(forbiddenPost)
    .put(updateProductById)
    .delete(deleteProductById)




module.exports = router