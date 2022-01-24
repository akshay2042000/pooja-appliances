var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users')

/* GET users listing. */
router.route('/')
    .get(async function (req, res, next) {
        try {
            const users = await User.find({});
            if (users) {
                res.status(200).json({
                    status: 'success',
                    data: users,
                });
            }else{
                res.status(404).json({
                    status: 'fail',
                    message: 'No users found'
                })
            }
        }
        catch {
            err = new Error('Error while fetching users');
            err.status = 500;
            next(err);
        }

    });

module.exports = router;
