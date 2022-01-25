const mongoose = require('mongoose');
const Product = require('../models/products');

const getProducts = async (req, res, next) => {
    try {

        const category = req.query.category;
        const company = req.query.company;
        let products

        if (category || company) {
            products = await Product.find({
                $or: [
                    {
                        categories: {
                            $in: [category]
                        }
                    },
                    {
                        company: {
                            $in: [company]
                        }
                    }
                ]
            });
        }
        else {
            products = await Product.find({});
        }

        if (products.length > 0) {
            res.status(200).json({
                status: 'success',
                data: products,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No products found'
            })
        }
    }
    catch {
        err = new Error('Error while fetching products');
        err.status = 500;
        next(err);
    }
}




const getSearchedProducts = async (req, res, next) => {
    const search = req.query.key;


    try {

        const regex = new RegExp("\\b" + search, "i");

        // const products = await Product.find({ $or: [{ 'name': { $regex: regex } }, { 'company': { $regex: regex } }] });

        const products = await Product.find({ name: { $regex: regex } });


        if (products) {
            res.status(200).json({
                status: 'success',
                data: products,
            });
        }
        else {
            res.status(404).json({
                status: 'fail',
                message: 'No products found'
            })
        }

    }
    catch {
        err = new Error('Error while searching products');
        err.status = 500;
        next(err);
    }
}
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json({
                status: 'success',
                data: product,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No products found'
            })
        }
    } catch (err) {
        err = new Error('Error while fetching products');
        err.status = 500;
        next(err);
    }
}



const postProduct = async (req, res, next) => {
    const product = new Product(req.body)

    product.variants.colors = req.body.colors
    product.variants.sizes = req.body.sizes

    try {
        const newProduct = await product.save();
        res.status(201).json({
            status: 'success',
            data: newProduct,
        })
    }
    catch {
        err = new Error('Error while creating product');
        err.status = 500;
        next(err);
    }
}

const updateProductById = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (product) {
            res.status(200).json({
                status: 'success',
                data: product,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No product found'
            })
        }
    }
    catch {
        err = new Error('Error while updating product');
        err.status = 500;
        next(err);
    }
}

const deleteProductById = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {
            res.status(200).json({
                status: 'success',
                data: product,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No product found'
            })
        }
    }
    catch {
        err = new Error('Error while deleting product');
        err.status = 500;
        next(err);
    }
}
const deleteProducts = async (req, res, next) => {
    try {
        const product = await Product.deleteMany({});
        if (product) {
            res.status(200).json({
                status: 'success',
                data: product,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No product found'
            })
        }
    }
    catch {
        err = new Error('Error while deleting product');
        err.status = 500;
        next(err);
    }
}

module.exports = {
    getProducts,
    getProductById,
    postProduct,
    updateProductById,
    deleteProductById,
    deleteProducts,
    getSearchedProducts
}
