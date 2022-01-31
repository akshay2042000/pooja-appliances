const express = require("express")
const User = require("../models/users");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        ...req.body,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_KEY
        ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({
            status: 'success',
            data: savedUser,
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err,
        });
    }
});

//LOGIN

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            res.status(401).json("user not found");
        } else {
            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_KEY
            );
            const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

            if (OriginalPassword !== req.body.password) {
                res.status(401).json("Wrong credentials!");
            } else {
                const accessToken = jwt.sign(
                    {
                        id: user._id,
                        isAdmin: user.isAdmin,
                    },
                    process.env.JWT_KEY,
                    { expiresIn: "365d" }
                );

                const { password, ...others } = user._doc;
                res.status(200).json({ ...others, accessToken });
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;