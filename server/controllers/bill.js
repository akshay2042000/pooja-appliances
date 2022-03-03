const Bill = require('../models/bills');
const cloudinary = require('../cloudinary')
const Order = require('../models/orders');


const getBills = async (req, res, next) => {
    try {
        const appliances = req.query.app;
        let bills
        if (appliances) {
            bills = await Bill.find({
                app: appliances
            }).populate('order');
        } else {
            bills = await Bill.find({}).populate({ path: 'order', select: 'orderId' });
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


const getLastBill = async (req, res, next) => {

    const app = req.query.app;
    if (app) {
        try {
            const bill = await Bill.find({
                app: app
            }).sort({ invoiceNumber: -1 }).limit(1);

            if (bill && bill.length > 0) {
                res.status(200).json({
                    status: 'success',
                    data: bill[0],
                });
            } else {
                res.status(404).json({
                    status: 'fail',
                    message: 'No bills found'
                })
            }
        } catch (err) {
            res.state(500).json(err);
        }
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


const getLatestBills = async (req, res, next) => {
    try {
        const bills = await Bill.find({}).populate({ path: 'order', select: 'orderId' }).sort({ createdAt: -1 }).limit(5);
        if (bills) {
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

        const [bill, updateOrder] = await Promise.all([
            Bill.findByIdAndDelete(req.params.id),
            Order.findByIdAndUpdate(req.body.order, { $set: { isBilled: false } })
        ])

        // const bill = await Bill.findByIdAndDelete(req.params.id);
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
    catch (err) {
        res.status(500).json(err);
    }


    cloudinary.uploader.destroy(`invoices/download/${req.body.name}`, function (result) {
    });
    cloudinary.uploader.destroy(`invoices/view/${req.body.name}`, function (result) {
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
    deleteBills,
    getLastBill,
    getLatestBills
}
