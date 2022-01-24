const User = require('../models/users');


const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        if (users) {
            res.status(200).json({
                status: 'success',
                data: users,
            });
        } else {
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
}
const getUserById = async (req, res, next) => {
    try {
        const users = await User.findById(req.params.id);
        if (users) {
            res.status(200).json({
                status: 'success',
                data: users,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No user found'
            })
        }
    }
    catch {
        err = new Error('Error while fetching users');
        err.status = 500;
        next(err);
    }
}


const postUser = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const newUser = await user.save();

        res.status(201).json({
            status: 'success',
            data: newUser,
        });

    }
    catch {
        err = new Error('Error while fetching users');
        err.status = 500;
        next(err);
    }
}

const updateUserById = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        if (user) {
            res.status(200).json({
                status: 'success',
                data: user,
            });
        }
        else {
            res.status(404).json({
                status: 'fail',
                message: 'No user found'
            })
        }

    } catch {
        err = new Error('Error while fetching users');
        err.status = 500;
        next(err);
    }
}

const deleteUserById = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.status(200).json({
                status: 'success',
                data: user,
            });
        }
        else {
            res.status(404).json({
                status: 'fail',
                message: 'No user found'
            })
        }
    }
    catch {
        err = new Error('Error while fetching users');
        err.status = 500;
        next(err);
    }

}

module.exports = {
    getUsers,
    postUser,
    getUserById,
    updateUserById,
    deleteUserById
}
