const jwt = require('jsonwebtoken');
require("dotenv").config();

const JWT_secret = process.env.REACT_APP_JWT_SECRET

const fetchuser = (req, res, next) => {
    //Get the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_secret)
        req.user = data;
        next()
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}

module.exports = fetchuser;