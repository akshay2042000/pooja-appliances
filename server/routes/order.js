const express = require('express');
const router = express.Router();
const { getOrders, postOrder, getOrderById, updateOrderById, deleteOrderById,deleteOrders , getLatestOrders} = require('../controllers/order');
const { forbiddenGet, forbiddenPost, forbiddenPut, forbiddenDelete } = require('../controllers/forbiddenController');
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin, } = require('../middleware/authenticate');

router.route('/')
    .get(verifyTokenAndAdmin,getOrders)
    .post(verifyToken,postOrder)
    .put(forbiddenPut)
    .delete(verifyTokenAndAdmin,deleteOrders)

router.route('/latest')  
    .get(verifyTokenAndAdmin, getLatestOrders)

router.route('/:id')
    .get(verifyTokenAndAuthorization,getOrderById)
    .post(forbiddenPost)
    .put(verifyTokenAndAdmin,updateOrderById)
    .delete(verifyTokenAndAdmin,deleteOrderById)


module.exports = router