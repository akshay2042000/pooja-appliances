const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require('path');
var docxConverter = require('docx-pdf');
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const cloudinary = require('../cloudinary');


const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin, } = require('../middleware/authenticate');


function uploadToCloudinary(image,name) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, {
            public_id: 'invoices/' +'download/' + name,
            flags: 'attachment',
            discard_original_filename: true,
        }, (err, url) => {
            if (err) return reject(err);
            return resolve(url);
        })
    });
}
function uploadViewableToCloudinary(image,name) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, {
            public_id: 'invoices/' +'view/' + name,
            discard_original_filename: true,
        }, (err, url) => {
            if (err) return reject(err);
            return resolve(url);
        })
    });
}

router.route('/')
    .post(verifyTokenAndAdmin, async (req, res) => {
        const content = fs.readFileSync(
            './public/assets/invoice.docx',
            "binary"
        );

        const zip = new PizZip(content);

        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        doc.render(req.body.invoiceData)

        const buf = doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });
        fs.writeFileSync('./public/assets/output.docx', buf);
        docxConverter('./public/assets/output.docx', './public/assets/output.pdf', async (err, result) => {
            if (err) console.log(err);
            else {
                const name = req.body.name;
                const [resultDownload, resultView] = await Promise.all([
                    uploadToCloudinary('./public/assets/output.pdf', name),
                    uploadViewableToCloudinary('./public/assets/output.pdf', name),
                ])
                res.status(200).json({
                    downloadUrl: resultDownload.url,
                    viewUrl: resultView.url,
                });
                fs.unlinkSync('./public/assets/output.docx');
                fs.unlinkSync('./public/assets/output.pdf');
            }
        });
    })


module.exports = router