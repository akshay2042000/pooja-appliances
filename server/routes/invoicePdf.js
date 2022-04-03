const express = require('express');
const router = express.Router();
const fs = require("fs");
const cloudinary = require('../cloudinary');
const pdfTemplate = require('../public/javascripts/htmlToPdf');
const pdf = require('html-pdf');
const applianceData = require('../public/javascripts/applianceData');


const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin, } = require('../middleware/authenticate');


function uploadToCloudinary(image, name) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, {
            public_id: 'invoices/' + 'download/' + name,
            flags: 'attachment',
            discard_original_filename: true,
        }, (err, url) => {
            if (err) return reject(err);
            return resolve(url);
        })
    });
}
function uploadViewableToCloudinary(image, name) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, {
            public_id: 'invoices/' + 'view/' + name,
            discard_original_filename: true,
        }, (err, url) => {
            if (err) return reject(err);
            return resolve(url);
        })
    });
}
router.route('/')
    .post(verifyTokenAndAdmin, async (req, res) => {
        const name = req.body.name;
        const invoiceData = req.body.invoiceData;
        const appliances = invoiceData.app;
        const appData = applianceData[appliances]
        const data = { ...appData, ...invoiceData };
        pdf.create(pdfTemplate(data), { orientation: "landscape", format: 'A4', border:{left:'10mm', right:'10mm'}  }).toFile('./public/assets/output.pdf', 
        // border :{ top: '10mm', bottom : '10mm'}
        async (err, result) => {
            if (err) return console.log(err);
            const [resultDownload, resultView] = await Promise.all([
                uploadToCloudinary('./public/assets/output.pdf', name),
                uploadViewableToCloudinary('./public/assets/output.pdf', name),
            ])
            res.status(200).json({
                downloadUrl: resultDownload.secure_url,
                viewUrl: resultView.secure_url,
            });
            fs.unlinkSync('./public/assets/output.pdf');
        });
    })

module.exports = router