const User = require('../models/User');
const config = require('../config/config')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const tokenList = {}

// Validation
const validateLoginInput = require("../validation/login");

// Create and Save a new Facilities
exports.create = (req, res) => {
    
  const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;
  
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: "Email not found" });
      }
      
      
  
          // Check password
          bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
          // User matched
         
          // Create JWT Payload
         
          
          const payload = {
            user
                  };

          
          
          // Sign token
          const token = jwt.sign(payload, config.key, { expiresIn: config.token})
          const refreshToken = jwt.sign(payload, config.refresh_key, { expiresIn: config.refresh_token})
          const response = {
          "token": token,
          "refreshToken": refreshToken,
    }
    tokenList[refreshToken] = response
    res.status(200).json(response);

        }
    
          })
    })
}

