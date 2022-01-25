var express = require('express');
var router = express.Router();

const User = require('../models/users')
const { getUsers, postUser, getUserById, updateUserById, deleteUserById, deleteUsers } = require('../controllers/user');
const { forbiddenGet, forbiddenPost, forbiddenPut, forbiddenDelete } = require('../controllers/forbiddenController');
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin, } = require('../middleware/authenticate');

/* GET users listing. */
router.route('/')
    .get(verifyTokenAndAdmin,getUsers)
    .post(verifyTokenAndAdmin,postUser)
    .put(forbiddenPut)
    .delete(verifyTokenAndAdmin,deleteUsers)

router.route('/:id')
    .get(verifyTokenAndAdmin,getUserById)
    .post(forbiddenPost)
    .put(verifyTokenAndAuthorization,updateUserById)
    .delete(verifyTokenAndAdmin,deleteUserById)


module.exports = router;
