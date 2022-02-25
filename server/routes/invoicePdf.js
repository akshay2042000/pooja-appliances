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


router.route('/')
    .post(verifyTokenAndAdmin, async (req, res) => {
        const content = fs.readFileSync(
            './assets/doc.docx',
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
        fs.writeFileSync('./assets/output.docx', buf);
        docxConverter('./assets/output.docx', './assets/output.pdf', (err, result) => {
            if (err) console.log(err);
            else {
                // const url = await uploadFile('./assets/output.pdf', req.body.name + '.pdf')
                cloudinary.uploader.upload('./assets/output.pdf', {
                    public_id: 'invoices/' + req.body.name,
                    flags: 'attachment',
                    discard_original_filename: true,
                },
                    function (error, result) {
                        res.status(200).json({
                            url: result.url,
                        });
                        fs.unlinkSync('./assets/output.docx');
                        fs.unlinkSync('./assets/output.pdf');
                    });
            }
        });
    })


module.exports = router