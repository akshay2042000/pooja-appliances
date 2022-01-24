const express = require('express');
const router = express.Router();
const { getCategories, postCategory, getCategoryById, updateCategoryById, deleteCategoryById,deleteCategories } = require('../controllers/category');
const { forbiddenGet, forbiddenPost, forbiddenPut, forbiddenDelete } = require('../controllers/forbiddenController');


router.route('/')
    .get(getCategories)
    .post(postCategory)
    .put(forbiddenPut)
    .delete(deleteCategories)

router.route('/:id')
    .get(getCategoryById)
    .post(forbiddenPost)
    .put(updateCategoryById)
    .delete(deleteCategoryById)


module.exports = router