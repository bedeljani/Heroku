
const express = require('express');
      router = express.Router();
      multer  = require('multer');
      Dorm = require('../../models/Dorm')
      SearchController = require('./search')
      validateDormInput = require('../../validation/dorm')

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


  // Insert Dorm
  router.post('/upload',upload.single('file'), checkToken ,function(req, res, next) {
    jwt.verify(req.token, keys.secretOrKey, (err, authorizedData) => {
      if(err){
          //If error send Forbidden (403)
          console.log('ERROR: Could not connect to the protected route');
          res.sendStatus(403);
      }else{
    
    
    console.log(req.file);
  
  const { errors, isValid } = validateDormInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  
          const newDorm = new Dorm
              (
                {
                    name : req.body.name, 
                    address : req.body.address,
                    lat : req.body.lat,
                    long : req.body.long,
                    image: req.file.filename, 
                    city : req.body.city,  
                    room : req.body.room, 
                    desc : req.body.desc, 
                    type : req.body.type,
                    price : req.body.price   
                }
              );
        
                newDorm
                .save() 
                .then(dorm => res.json(dorm))
                .catch(err => console.log(err));
                
})
    




//Update
router.put('/upload/:_id',upload.single('file'),function(req, res, next) {
const { errors, isValid } = validateDormInput(req.body);

Dorm.findById(req.params._id, (err, dorm) => {
  
  // Check validation
  if (!isValid) {
  return res.status(400).json(errors);
}


        const newDorm = new Dorm
            (
              {
                  name : req.body.name, 
                  address : req.body.address,
                  lat : req.body.lat,
                  long : req.body.long,
                  image: req.file.filename, 
                  city : req.body.city,  
                  room : req.body.room, 
                  desc : req.body.desc, 
                  type : req.body.type,
                  price : req.body.price   
              }
            );
            newDorm.save(function (err) {
              if (err)
                  res.json(err);
              res.json({
                  message: 'Dorm updated',
                  data: dorm
              });
          });
              
            })
          })


//View All Data    
router.get ('/', function (req, res) {
  Dorm.find(function (err, dorm) {
      if (err) {
          res.json({
              status: "error",
              message: err,
          });
      }
      res.json({
          data: dorm
      });
  });
});
    

//View ById
    router.get('/:_id',(req,res)=>{
    Dorm.findById(req.params._id,(err, dorm) => {
        if (err){
          res.send(err);
        }
        res.json({
          data: dorm
        });
      })
    })
    


    //Searching
    router.route('/dorm/search/:searchby/:query')
    .get(SearchController.searchDorm)

//Edit Data
  router.put('/edit/:id', (req,res) => {
  Dorm.findByIdAndUpdate({ _id : req.params.id}, { $set:
  {
    name : req.body.name, 
    address : req.body.address,
    lat : req.body.lat,
    long : req.body.long,
    image: req.file.filename, 
    city : req.body.city,  
    room : req.body.room, 
    desc : req.body.desc, 
    type : req.body.type,
    price : req.body.price
  }})
  .then(data => {
    Dorm.find({})
    .then(data => res.send(data))
    })
    })

module.exports = router;