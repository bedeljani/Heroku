const Dorm = require('../models/Dorm');
validateDormInput = require('../validation/dorm')
const jwt = require('jsonwebtoken')

exports.create = (req, res) =>{
    Dorm.create()
        const { errors, isValid } = validateDormInput(req.body);
         // Check validation
         if (!isValid) {
            return res.status(400).json(errors);
          }
          console.log(req.files)
          //const token = 
    const newDorm = new Dorm
              (
                {
                    name : req.body.name, 
                    address : req.body.address,
                    lat : req.body.lat,
                    long : req.body.long,
                    image: req.files.map((i) => (i.filename)), 
                    city : req.body.city,  
                    roomNumber: req.body.roomNumber,
                    roomType: req.body.roomType,
                    width: req.body.width,
                    length: req.body.length, 
                    facilites : req.body.facilites.split(', ').map((i)=>(i)),
                    desc : req.body.desc, 
                    price : req.body.price   
                }
              );
        
                newDorm
                .save() 
                .then(dorm => res.json(dorm))
                .catch(err => console.log(err));
}


// Retrieve and return all dorms from the database.
exports.findAll = (req, res) => {
    Dorm.find()
    .then(dorms => {
        res.send(dorms);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving dorms."
        });
    });
};

// Find a single dorm with a dormId
exports.findOne = (req, res) => {
    Dorm.findById(req.params.dormId)
    .then(dorm => {
        if(!dorm) {
            return res.status(404).send({
                message: "Dorm not found with id " + req.params.dormId
            });            
        }
        res.send(dorm);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Dorm not found with id " + req.params.dormId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving dorm with id " + req.params.dormId
        });
    });
};

// Update a dorm identified by the dormId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Dorm content can not be empty"
        });
    }

    // Find dorm and update it with the request body
    Dorm.findByIdAndUpdate(req.params.dormId, {
        title: req.body.title || "Untitled Dorm",
        content: req.body.content
    }, {new: true})
    .then(dorm => {
        if(!dorm) {
            return res.status(404).send({
                message: "Dorm not found with id " + req.params.dormId
            });
        }
        res.send(dorm);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Dorm not found with id " + req.params.dormId
            });                
        }
        return res.status(500).send({
            message: "Error updating dorm with id " + req.params.dormId
        });
    });
};

// Delete a dorm with the specified dormId in the request
exports.delete = (req, res) => {
    Dorm.findByIdAndRemove(req.params.dormId)
    .then(dorm => {
        if(!dorm) {
            return res.status(404).send({
                message: "Dorm not found with id " + req.params.dormId
            });
        }
        res.send({message: "Dorm deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Dorm not found with id " + req.params.dormId
            });                
        }
        return res.status(500).send({
            message: "Could not delete dorm with id " + req.params.dormId
        });
    });
};
