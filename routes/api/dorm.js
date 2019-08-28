const express = require('express');
      router = express.Router();
      multer  = require('multer');
      Dorm = require('../../models/Dorm')
      validateDormInput = require('../../validation/dorm')
      dorm = require("../../controllers/dormController")
      middleware = require('../../config/middleware')


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

 //Storage Multer
 storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

  const upload = multer({storage: storage});


router.post('/dorms', upload.array('files', 20) ,checkToken ,  dorm.create)
router.get('/dorms', dorm.findAll)
router.delete('/dorms/:dormId', dorm.delete)

module.exports = router;

// //Check to make sure header is not undefined, if so, return Forbidden (403)
// const checkToken = (req, res, next) => {
//   const header = req.headers['authorization'];

//   if(typeof header !== 'undefined') {
//       const bearer = header.split(' ');
//       const token = bearer[1];

//       req.token = token;
//       next();
//   } else {
//       //If header is undefined return Forbidden (403)
//       res.sendStatus(403)
//   }
// }
