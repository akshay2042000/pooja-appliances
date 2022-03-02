const express = require('express');
const router = express.Router();
const { getProducts, postProduct, getProductById, updateProductById, deleteProductById, deleteProducts, getSearchedProducts, getRelatedProducts, getFeaturedProducts } = require('../controllers/product');

const { forbiddenGet, forbiddenPost, forbiddenPut, forbiddenDelete } = require('../controllers/forbiddenController');
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin, } = require('../middleware/authenticate');

router.route('/')
    .get(getProducts)
    .post(verifyTokenAndAdmin, postProduct)
    .put(forbiddenPut)
    .delete(verifyTokenAndAdmin, deleteProducts)

router.route('/search')
    .get(getSearchedProducts)


router.route('/related')
    .get(getRelatedProducts)

router.route('/featured')
    .get(getFeaturedProducts)

router.route('/:id')
    .get(getProductById)
    .post(forbiddenPost)
    .put(verifyTokenAndAdmin, updateProductById)
    .delete(verifyTokenAndAdmin, deleteProductById)




module.exports = router