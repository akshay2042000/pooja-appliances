const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require('path');
var docxConverter = require('docx-pdf');
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");


const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin, } = require('../middleware/authenticate');
const { storageRef } = require('../firebase');



async function uploadFile(path, filename) {
    const storage = await storageRef.upload(path, {
        public: true,
        destination: `invoices/${filename}`,
    });
    return storage[0].metadata.mediaLink;
}

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
        doc.render({
            first_name: "sarthak",
            last_name: "ahuja",
            phone: "0652455478",
            description: "New Website",
        })

        const buf = doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });
        fs.writeFileSync('./assets/output.docx', buf);
        docxConverter('./assets/output.docx', './assets/output.pdf', async (err, result) => {
            if (err) console.log(err);
            else {
                const url = await uploadFile('./assets/output.pdf', req.body.name + '.pdf')
                res.status(200).json({
                    url: url
                });
                fs.unlinkSync('./assets/output.docx');
                fs.unlinkSync('./assets/output.pdf');
            }
        });
    })


module.exports = router