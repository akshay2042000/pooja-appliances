const express = require('express');
const router = express.Router();
const { getHsnCodes, postHsnCode, getHsnCodeById, updateHsnCodeById, deleteHsnCodeById, deleteHsnCodes } = require('../controllers/hsn');
const { forbiddenGet, forbiddenPost, forbiddenPut, forbiddenDelete } = require('../controllers/forbiddenController');
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin, } = require('../middleware/authenticate');

router.route('/')
    .get(verifyTokenAndAdmin,getHsnCodes)
    .post(verifyTokenAndAdmin,postHsnCode)
    .put(forbiddenPut)
    .delete(verifyTokenAndAdmin,deleteHsnCodes)

router.route('/:id')
    .get(verifyTokenAndAdmin,getHsnCodeById)
    .post(forbiddenPost)
    .put(verifyTokenAndAdmin,updateHsnCodeById)
    .delete(verifyTokenAndAdmin,deleteHsnCodeById)


module.exports = router