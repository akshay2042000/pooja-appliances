var express = require('express');
var router = express.Router();

const User = require('../models/users')
const { getUsers, postUser,getUserById,updateUserById,deleteUserById,deleteUsers } = require('../controllers/user');
const { forbiddenGet, forbiddenPost, forbiddenPut, forbiddenDelete } = require('../controllers/forbiddenController');

/* GET users listing. */
router.route('/')
    .get(getUsers)
    .post(postUser)
    .put(forbiddenPut)
    .delete(deleteUsers)

router.route('/:id')
    .get(getUserById)
    .post(forbiddenPost)
    .put(updateUserById)
    .delete(deleteUserById)


module.exports = router;
