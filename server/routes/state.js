const express = require('express');
const router = express.Router();
const { getStates, postState, updateState, deleteState, getStateById, updateStateById, deleteStateById,deleteAllStates } = require('../controllers/state');
const { forbiddenGet, forbiddenPost, forbiddenPut, forbiddenDelete } = require('../controllers/forbiddenController');
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin, } = require('../middleware/authenticate');

router.route('/')
    .get(verifyTokenAndAdmin,getStates)
    .post(verifyTokenAndAdmin,postState)
    .put(verifyTokenAndAdmin,updateState)
    .delete(verifyTokenAndAdmin,deleteAllStates)

router.route('/:id')
    .get(verifyTokenAndAdmin,getStateById)
    .post(forbiddenPost)
    .put(verifyTokenAndAdmin,updateStateById)
    .delete(verifyTokenAndAdmin,deleteStateById)




module.exports = router