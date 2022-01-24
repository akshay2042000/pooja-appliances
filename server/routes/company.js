const express = require('express');
const router = express.Router();
const { getCompanies, postCompany, getCompanyById, updateCompanyById, deleteCompanyById,deleteCompanies } = require('../controllers/company');
const { forbiddenGet, forbiddenPost, forbiddenPut, forbiddenDelete } = require('../controllers/forbiddenController');


router.route('/')
    .get(getCompanies)
    .post(postCompany)
    .put(forbiddenPut)
    .delete(deleteCompanies)

router.route('/:id')
    .get(getCompanyById)
    .post(forbiddenPost)
    .put(updateCompanyById)
    .delete(deleteCompanyById)


module.exports = router