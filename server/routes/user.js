var express = require('express');
var router = express.Router();

const User = require('../models/users')
const { getUsers, postUser,getUserById,updateUserById,deleteUserById } = require('../controllers/user');
const { forbiddenGet, forbiddenPost, forbiddenPut, forbiddenDelete } = require('../controllers/forbiddenController');

/* GET users listing. */
router.route('/')
    .get(getUsers)
    .post(postUser)
    .put(forbiddenPut)
    .delete(forbiddenDelete)

router.route('/:id')
    .get(getUserById)
    .post(forbiddenPost)
    .put(updateUserById)
    .delete(deleteUserById)


module.exports = router;
