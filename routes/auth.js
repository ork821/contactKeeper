const express = require('express');
const router = express.Router();
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')

router.get('/', auth, async (req, res) => {
    try {
        console.log(req)
        const user = await User.findById(req.user.id).select('-password');
        await res.json({user})
    } catch (e) {
        console.error(e)
        res.status(500).send('Server Error')
    }
});

router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email: email});
        if (!user) {
            return res.status(400).json({msg: `There is no user with email: ${email}`})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({msg: 'Invalid password'})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) {
                throw err;
            }
            res.json({token})
        })

    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error')
    }

});

module.exports = router;