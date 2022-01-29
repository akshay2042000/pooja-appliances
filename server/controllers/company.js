const mongoose = require('mongoose');
const Company = require('../models/companies');

const getCompanies = async (req, res, next) => {
    try {
        const appliances = req.query.app;

        let companies

        if (appliances) {
            companies = await Company.find({
                app: appliances
            });
        } else {
            companies = await Company.find({});
        }

        if (companies && companies.length > 0) {
            res.status(200).json({
                status: 'success',
                data: companies,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No companies found'
            })
        }
    } catch (err) {
        err = new Error('Error while fetching companies');
        err.status = 500;
        next(err);
    }
}


const getCompanyById = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.id);
        if (company) {
            res.status(200).json({
                status: 'success',
                data: company,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No companies found'
            })
        }
    } catch (err) {
        err = new Error('Error while fetching companies');
        err.status = 500;
        next(err);
    }
}



const postCompany = async (req, res, next) => {
    const company = new Company(req.body)

    try {
        const newCompany = await company.save();
        res.status(201).json({
            status: 'success',
            data: newCompany,
        })
    }
    catch {
        err = new Error('Error while creating company');
        err.status = 500;
        next(err);
    }
}

const updateCompanyById = async (req, res, next) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (company) {
            res.status(200).json({
                status: 'success',
                data: company,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No company found'
            })
        }
    }
    catch {
        err = new Error('Error while updating company');
        err.status = 500;
        next(err);
    }
}

const deleteCompanyById = async (req, res, next) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (company) {
            res.status(200).json({
                status: 'success',
                data: company,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No company found'
            })
        }
    }
    catch {
        err = new Error('Error while deleting company');
        err.status = 500;
        next(err);
    }
}

const deleteCompanies = async (req, res, next) => {
    try {
        const company = await Company.deleteMany({});
        if (company) {
            res.status(200).json({
                status: 'success',
                data: company,
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'No company found'
            })
        }
    }
    catch {
        err = new Error('Error while deleting company');
        err.status = 500;
        next(err);
    }
}

module.exports = {
    getCompanies,
    getCompanyById,
    postCompany,
    updateCompanyById,
    deleteCompanyById,
    deleteCompanies
}
