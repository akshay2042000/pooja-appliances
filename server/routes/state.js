const express = require('express');
const router = express.Router();
const State = require('../models/states');


router.route('/')
    .get(async (req, res, next) => {
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
    })
    .post(async (req, res, next) => {
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
    })
    .put(async (req, res, next) => {
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
    })
    .delete(async (req, res, next) => {
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
    })

module.exports = router