const mongoose = require('mongoose');
const Order = require('../models/orders');

const getOrders = async (req, res, next) => {
    try {
        const appliances = req.query.app;
        let orders

        if (appliances) {
            orders = await Order.find({
                app: appliances
            }).populate({ path: 'user', select: 'name' });
        } else {
            orders = await Order.find({}).populate('user');
        }

        if (orders && orders.length > 0) {
            res.status(200).json({
                status: 'success',
                data: orders,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No orders found'
            })
        }
    } catch (err) {
        err = new Error('Error while fetching orders');
        err.status = 500;
        next(err);
    }
}


const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('user').populate({ path: 'user', populate: { path: 'state' } }).populate({ path: 'items.product' }).populate({ path: 'items.product', populate: { path: 'hsnCode' } });
        if (order) {
            res.status(200).json({
                status: 'success',
                data: order,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No orders found'
            })
        }
    } catch (err) {
        err = new Error('Error while fetching orders');
        err.status = 500;
        next(err);
    }
}

const getLatestOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 }).limit(5).populate('user');
        if (orders && orders.length > 0) {
            res.status(200).json({
                status: 'success',
                data: orders,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No orders found'
            });
        }
    } catch (err) {
        err = new Error('Error while fetching orders');
        err.status = 500;
        next(err);
    }
}

const postOrder = async (req, res, next) => {
    const order = new Order(req.body)

    try {
        var newOrder = await order.save();
        newOrder = await Order.findById(newOrder._id).populate('items.product');
        res.status(201).json({
            status: 'success',
            data: newOrder,
        })
    }
    catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}

const updateOrderById = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (order) {
            res.status(200).json({
                status: 'success',
                data: order,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No order found'
            })
        }
    }
    catch {
        err = new Error('Error while updating order');
        err.status = 500;
        next(err);
    }
}

const deleteOrderById = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (order) {
            res.status(200).json({
                status: 'success',
                data: order,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No order found'
            })
        }
    }
    catch {
        err = new Error('Error while deleting order');
        err.status = 500;
        next(err);
    }
}
const deleteOrders = async (req, res, next) => {
    try {
        const order = await Order.deleteMany({});
        if (order) {
            res.status(200).json({
                status: 'success',
                data: order,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No order found'
            })
        }
    }
    catch {
        err = new Error('Error while deleting order');
        err.status = 500;
        next(err);
    }
}

module.exports = {
    getOrders,
    getOrderById,
    postOrder,
    updateOrderById,
    deleteOrderById,
    deleteOrders,
    getLatestOrders
}
