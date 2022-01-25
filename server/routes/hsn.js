const express = require('express');
const router = express.Router();
const { getHsnCodes, postHsnCode, getHsnCodeById, updateHsnCodeById, deleteHsnCodeById, deleteHsnCodes } = require('../controllers/hsn');
const { forbiddenGet, forbiddenPost, forbiddenPut, forbiddenDelete } = require('../controllers/forbiddenController');


router.route('/')
    .get(getHsnCodes)
    .post(postHsnCode)
    .put(forbiddenPut)
    .delete(deleteHsnCodes)

router.route('/:id')
    .get(getHsnCodeById)
    .post(forbiddenPost)
    .put(updateHsnCodeById)
    .delete(deleteHsnCodeById)


module.exports = router