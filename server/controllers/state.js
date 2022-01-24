const State = require('../models/states');




const getStates = async (req, res, next) => {
    try {
        const states = await State.find({});
        if (states) {
            res.status(200).json({
                status: 'success',
                data: states,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No states found'
            })
        }
    } catch (err) {
        err = new Error('Error while fetching states');
        err.status = 500;
        next(err);
    }
}


const getStateById = async (req, res, next) => {
    try {
        const state = await State.findById(req.params.id);
        if (state) {
            res.status(200).json({
                status: 'success',
                data: state,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No states found'
            })
        }
    } catch (err) {
        err = new Error('Error while fetching states');
        err.status = 500;
        next(err);
    }
}



const postState = async (req, res, next) => {
    const state = new State({
        name: req.body.name,
        code: req.body.code,
    })

    try {
        const newState = await state.save();
        res.status(201).json({
            status: 'success',
            data: newState,
        })
    }
    catch {
        err = new Error('Error while creating state');
        err.status = 500;
        next(err);
    }
}

const updateState = async (req, res, next) => {
    try {
        const state = await State.findOneAndUpdate({ name: req.body.name }, { $set: req.body }, { new: true });
        if (state) {
            res.status(200).json({
                status: 'success',
                data: state,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No state found'
            })
        }
    }
    catch {
        err = new Error('Error while updating state');
        err.status = 500;
        next(err);
    }
}

const updateStateById = async (req, res, next) => {
    try {
        const state = await State.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (state) {
            res.status(200).json({
                status: 'success',
                data: state,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No state found'
            })
        }
    }
    catch {
        err = new Error('Error while updating state');
        err.status = 500;
        next(err);
    }
}

const deleteState = async (req, res, next) => {
    try {
        const state = await State.findOneAndDelete({ name: req.body.name });
        if (state) {
            res.status(200).json({
                status: 'success',
                data: state,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No state found'
            })
        }
    }
    catch {
        err = new Error('Error while deleting state');
        err.status = 500;
        next(err);
    }
}

const deleteStateById = async (req, res, next) => {
    try {
        const state = await State.findByIdAndDelete(req.params.id);
        if (state) {
            res.status(200).json({
                status: 'success',
                data: state,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No state found'
            })
        }
    }
    catch {
        err = new Error('Error while deleting state');
        err.status = 500;
        next(err);
    }
}


const deleteAllStates = async (req, res, next) => {
    try {
        const state = await State.deleteMany({});
        if (state) {
            res.status(200).json({
                status: 'success',
                data: state,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No state found'
            })
        }
    }
    catch {
        err = new Error('Error while deleting state');
        err.status = 500;
        next(err);
    }
}

module.exports = {
    getStates,
    getStateById,
    postState,
    updateState,
    updateStateById,
    deleteState,
    deleteStateById,
    deleteAllStates
}
