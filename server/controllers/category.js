const Category = require('../models/categories');

const getCategories = async (req, res, next) => {
    try {
        const appliances = req.query.app;

        let categories

        if (appliances) {
            categories = await Category.find({
                app: appliances
            });
        } else {
            categories = await Category.find({});
        }

        if (categories && categories.length > 0) {
            res.status(200).json({
                status: 'success',
                data: categories,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No categories found'
            })
        }
    } catch (err) {
        err = new Error('Error while fetching categories');
        err.status = 500;
        next(err);
    }
}


const getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            res.status(200).json({
                status: 'success',
                data: category,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No categories found'
            })
        }
    } catch (err) {
        err = new Error('Error while fetching categories');
        err.status = 500;
        next(err);
    }
}



const postCategory = async (req, res, next) => {
    const category = new Category(req.body)

    try {
        const newCategory = await category.save();
        res.status(201).json({
            status: 'success',
            data: newCategory,
        })
    }
    catch {
        err = new Error('Error while creating category');
        err.status = 500;
        next(err);
    }
}

const updateCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (category) {
            res.status(200).json({
                status: 'success',
                data: category,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No category found'
            })
        }
    }
    catch {
        err = new Error('Error while updating category');
        err.status = 500;
        next(err);
    }
}

const deleteCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (category) {
            res.status(200).json({
                status: 'success',
                data: category,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No category found'
            })
        }
    }
    catch {
        err = new Error('Error while deleting category');
        err.status = 500;
        next(err);
    }
}
const deleteCategories = async (req, res, next) => {
    try {
        const category = await Category.deleteMany({});
        if (category) {
            res.status(200).json({
                status: 'success',
                data: category,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No category found'
            })
        }
    }
    catch {
        err = new Error('Error while deleting category');
        err.status = 500;
        next(err);
    }
}

module.exports = {
    getCategories,
    getCategoryById,
    postCategory,
    updateCategoryById,
    deleteCategoryById,
    deleteCategories
}
