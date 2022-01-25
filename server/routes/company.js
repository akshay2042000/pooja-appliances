const express = require('express');
const router = express.Router();
const { getCompanies, postCompany, getCompanyById, updateCompanyById, deleteCompanyById,deleteCompanies } = require('../controllers/company');
const { forbiddenGet, forbiddenPost, forbiddenPut, forbiddenDelete } = require('../controllers/forbiddenController');
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin, } = require('../middleware/authenticate');

router.route('/')
    .get(getCompanies)
    .post(verifyTokenAndAdmin,postCompany)
    .put(forbiddenPut)
    .delete(verifyTokenAndAdmin,deleteCompanies)

router.route('/:id')
    .get(getCompanyById)
    .post(forbiddenPost)
    .put(verifyTokenAndAdmin,updateCompanyById)
    .delete(verifyTokenAndAdmin,deleteCompanyById)


module.exports = router