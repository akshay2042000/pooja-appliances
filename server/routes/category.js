const express = require('express');
const router = express.Router();
const { getCategories, postCategory, getCategoryById, updateCategoryById, deleteCategoryById, deleteCategories } = require('../controllers/category');
const { forbiddenGet, forbiddenPost, forbiddenPut, forbiddenDelete } = require('../controllers/forbiddenController');

const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin, } = require('../middleware/authenticate');

router.route('/')
    .get(getCategories)
    .post(verifyTokenAndAdmin,postCategory)
    .put(forbiddenPut)
    .delete(verifyTokenAndAdmin,deleteCategories)

router.route('/:id')
    .get(getCategoryById)
    .post(forbiddenPost)
    .put(verifyTokenAndAdmin,updateCategoryById)
    .delete(verifyTokenAndAdmin,deleteCategoryById)


module.exports = router