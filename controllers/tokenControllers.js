const User = require('../models/User');
const config = require('../config/config')
const jwt = require("jsonwebtoken");

const tokenList = {}

exports.create = (req,res) => {
    
    const newUser = new User({
        email: req.body.email
      }) 
        // refresh the damn token
         const postData = req.body
        
        // if refresh token exists
        if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
        const payload = {
            "email": postData.email,
                };
        const token = jwt.sign(payload, config.key, { expiresIn: config.token})
        const response = {
            "token": token,
        }
        // update the token in the list
        tokenList[postData.refreshToken].token = token
        res.status(200).json(response);        
        } else {
        res.status(404).send('Invalid request')
            }
}
    