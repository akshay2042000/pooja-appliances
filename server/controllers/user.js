const User = require('../models/users');


const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).populate({ path: 'state', select: 'name' });
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
        const users = await User.findById(req.params.id).populate({ path: 'state', select: 'name' });
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


const getSearchedUsers = async (req, res, next) => {
    const search = req.query.key;

    try {
        if (!search) {
            res.status(200).json({
                status: 'success',
                data: [],
            });
        } else {
            // find match as per regex    
            const regex = new RegExp("\\b" + search, "i");
            var users = await User.find({
                username: {
                    $regex: regex
                }
            }).populate({ path: 'state' }).limit(7)
                .catch(err => res.status(500).json(err));;

            // find match as per string similarity
            if (users) {
                res.status(200).json({
                    status: 'success',
                    data: users,
                });
            }
            else {
                res.status(404).json({
                    status: 'fail',
                    message: 'No products found'
                })
            }
        }
    }
    catch (err) {
        res.status(500).json(err);
        console.log(err);
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

const deleteUsers = async (req, res, next) => {
    try {
        const user = await User.deleteMany({});
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
    deleteUserById,
    deleteUsers,
    getSearchedUsers
}
