const mongoose = require('mongoose');
const Bill = require('../models/bills');
const cloudinary = require('../cloudinary')


const getBills = async (req, res, next) => {
    try {
        const appliances = req.query.app;

        let bills

        if (appliances) {
            bills = await Bill.find({
                app: appliances
            });
        } else {
            bills = await Bill.find({});
        }

        if (bills && bills.length > 0) {
            res.status(200).json({
                status: 'success',
                data: bills,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No bills found'
            })
        }
    } catch (err) {
        err = new Error('Error while fetching bills');
        err.status = 500;
        next(err);
    }
}


const getBillById = async (req, res, next) => {
    try {
        const bill = await Bill.findById(req.params.id);
        if (bill) {
            res.status(200).json({
                status: 'success',
                data: bill,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No bills found'
            })
        }
    } catch (err) {
        err = new Error('Error while fetching bills');
        err.status = 500;
        next(err);
    }
}



const postBill = async (req, res, next) => {
    const bill = new Bill(req.body)

    try {
        const newBill = await bill.save();
        res.status(201).json({
            status: 'success',
            data: newBill,
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const updateBillById = async (req, res, next) => {
    try {
        const bill = await Bill.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (bill) {
            res.status(200).json({
                status: 'success',
                data: bill,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No bill found'
            })
        }
    }
    catch {
        err = new Error('Error while updating bill');
        err.status = 500;
        next(err);
    }
}


const deleteBillById = async (req, res, next) => {

    try {
        const bill = await Bill.findByIdAndDelete(req.params.id);
        if (bill) {
            res.status(200).json({
                status: 'success',
                data: bill,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No bill found'
            })
        }
    }
    catch {
        err = new Error('Error while deleting bill');
        err.status = 500;
        next(err);
    }
 

    cloudinary.uploader.destroy(`invoices/${req.body.name}`, function (result) {
        console.log(result);
    });



}
const deleteBills = async (req, res, next) => {
    try {
        const bill = await Bill.deleteMany({});
        if (bill) {
            res.status(200).json({
                status: 'success',
                data: bill,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No bill found'
            })
        }
    }
    catch {
        err = new Error('Error while deleting bill');
        err.status = 500;
        next(err);
    }
}

module.exports = {
    getBills,
    getBillById,
    postBill,
    updateBillById,
    deleteBillById,
    deleteBills
}
