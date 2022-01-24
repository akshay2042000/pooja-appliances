const express = require('express');
const router = express.Router();
const { getStates, postState, updateState, deleteState, getStateById, updateStateById, deleteStateById } = require('../controllers/state');
const { forbiddenGet, forbiddenPost, forbiddenPut, forbiddenDelete } = require('../controllers/forbiddenController');

router.route('/')
    .get(getStates)
    .post(postState)
    .put(forbiddenPut)
    .delete(forbiddenDelete)

router.route('/:id')
    .get(getStateById)
    .post(forbiddenPost)
    .put(updateStateById)
    .delete(deleteStateById)




module.exports = router