const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {check, validationResult} = require('express-validator');


router.post('/', [
    check('name', 'Please add name')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with >6 characters')
        .isLength({
            min: 6
        })
], (req, res) => {
    res.send(req.body);
});

module.exports = router;