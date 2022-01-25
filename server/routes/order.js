const express = require('express');
const router = express.Router();
const { getOrders, postOrder, getOrderById, updateOrderById, deleteOrderById,deleteOrders } = require('../controllers/order');
const { forbiddenGet, forbiddenPost, forbiddenPut, forbiddenDelete } = require('../controllers/forbiddenController');


router.route('/')
    .get(getOrders)
    .post(postOrder)
    .put(forbiddenPut)
    .delete(deleteOrders)

router.route('/:id')
    .get(getOrderById)
    .post(forbiddenPost)
    .put(updateOrderById)
    .delete(deleteOrderById)


module.exports = router