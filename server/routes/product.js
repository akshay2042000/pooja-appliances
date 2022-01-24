const express = require('express');
const router = express.Router();

router.all('/', (req, res, next) => {
    res.send('respond with a resource');
    console.log("hi");
})

module.exports = router