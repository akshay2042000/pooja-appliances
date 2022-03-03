const HsnCode = require('../models/hsnCodes');

const getHsnCodes = async (req, res, next) => {
    try {
        const hsnCodes = await HsnCode.find({});
        if (hsnCodes) {
            res.status(200).json({
                status: 'success',
                data: hsnCodes,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No hsnCodes found'
            })
        }
    } catch (err) {
        err = new Error('Error while fetching hsnCodes');
        err.status = 500;
        next(err);
    }
}


const getHsnCodeById = async (req, res, next) => {
    try {
        const hsnCode = await HsnCode.findById(req.params.id);
        if (hsnCode) {
            res.status(200).json({
                status: 'success',
                data: hsnCode,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No hsnCodes found'
            })
        }
    } catch (err) {
        err = new Error('Error while fetching hsnCodes');
        err.status = 500;
        next(err);
    }
}



const postHsnCode = async (req, res, next) => {
    const hsnCode = new HsnCode(req.body)

    try {
        const newHsnCode = await hsnCode.save();
        res.status(201).json({
            status: 'success',
            data: newHsnCode,
        })
    }
    catch {
        err = new Error('Error while creating hsnCode');
        err.status = 500;
        next(err);
    }
}

const updateHsnCodeById = async (req, res, next) => {
    try {
        const hsnCode = await HsnCode.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (hsnCode) {
            res.status(200).json({
                status: 'success',
                data: hsnCode,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No hsnCode found'
            })
        }
    }
    catch {
        err = new Error('Error while updating hsnCode');
        err.status = 500;
        next(err);
    }
}

const deleteHsnCodeById = async (req, res, next) => {
    try {
        const hsnCode = await HsnCode.findByIdAndDelete(req.params.id);
        if (hsnCode) {
            res.status(200).json({
                status: 'success',
                data: hsnCode,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No hsnCode found'
            })
        }
    }
    catch {
        err = new Error('Error while deleting hsnCode');
        err.status = 500;
        next(err);
    }
}
const deleteHsnCodes = async (req, res, next) => {
    try {
        const hsnCode = await HsnCode.deleteMany({});
        if (hsnCode) {
            res.status(200).json({
                status: 'success',
                data: hsnCode,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No hsnCode found'
            })
        }
    }
    catch {
        err = new Error('Error while deleting hsnCode');
        err.status = 500;
        next(err);
    }
}

module.exports = {
    getHsnCodes,
    getHsnCodeById,
    postHsnCode,
    updateHsnCodeById,
    deleteHsnCodeById,
    deleteHsnCodes
}
