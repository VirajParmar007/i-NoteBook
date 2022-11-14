const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
require("dotenv").config();


const JWT_secret = process.env.REACT_APP_JWT_SECRET


//ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 6 characters').isLength({ min: 6 }),
], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let success = false //Declaring success to show alert 

    //Check whether the email exists already 
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            success = false //To show alert if success is true
            return res.status(400).json({ success, error: "Sorry the email already exists" });
        }

        //Hashing our password using bcryptjs
        const salt = await bcrypt.genSaltSync(10)
        const securedPassword = await bcrypt.hash(req.body.password, salt);

        //Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword,
        })
        const data = {
            id: user.id
        }
        success = true //To show alert if success is true
        const authToken = jwt.sign(data, JWT_secret)
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }

})

//ROUTE 2: Authenticating a User using: Post "/api/auth/login"
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password required').exists(),
], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let success = false //Declaring success to show alert 
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false //To show alert if success is true
            return res.status(400).json({ success, error: "Entered credentials are incorrect" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false //To show alert if success is true
            return res.status(400).json({ success, error: "Entered credentials are incorrect" });
        }

        const data = {
            id: user.id
        }
        const authToken = jwt.sign(data, JWT_secret)
        success = true //To show alert if success is true
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})


//ROUTE 3: Get logged in User details using: Post "/api/auth/getuser" - Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userID = req.user.id;
        const user = await User.findById(userID).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})


module.exports = router