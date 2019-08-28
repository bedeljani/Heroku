const express = require('express')
      router = express.Router()

const register = require("../../controllers/registerControllers")
const login = require("../../controllers/loginControllers")
const token = require('../../controllers/tokenControllers')

router.post('/register', register.create)

router.post('/login', login.create)

router.post('/token', token.create)



















// // route POST api/users/login
// router.post("/login", (req, res) => {
//   // Form validation

//   const { errors, isValid } = validateLoginInput(req.body);

//   // Check validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   const email = req.body.email;
//   const password = req.body.password;

//   // Find user by email
//   User.findOne({ email }).then(user => {
//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({ message: "Email not found" });
//     }

//         // Check password
//         bcrypt.compare(password, user.password).then(isMatch => {
//           if (isMatch) {
//         // User matched
//         // Create JWT Payload
//         const payload = {
//           id: user.id,
//           name: user.name
//         };
        
//         // Sign token
//         jwt.sign(
//           payload,
//           keys.secretOrKey,
//           {
//              expiresIn : 1440 // 1 day 
//                       },
//           (err, token) => {
//             res.json({
//               success: true,
//               token: ["Bearer " + token]
            
//             });
//           }
//         );
//       } else {
//         return res
//           .status(400)
//           .json({ passwordincorrect: "Password incorrect" });
//       }
//     });
//   });
// });

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if(typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];

      req.token = token;
      next();
  } else {
      //If header is undefined return Forbidden (403)
      res.sendStatus(403)
  }
}

//This is a protected route 
 router.get('/data',checkToken ,(req, res) => {
  //verify the JWT token generated for the user
  jwt.verify(req.token, keys.secretOrKey, (err, authorizedData) => {
      if(err){
          //If error send Forbidden (403)
          console.log('ERROR: Could not connect to the protected route');
          res.sendStatus(403);
      } else {
          //If token is successfully verified, we can send the autorized data 
          res.json({
              authorizedData
          });
          console.log('SUCCESS: Connected to protected route');
      }
  })
});



module.exports = router;