const Facilities = require('../models/Facilities');

// Retrieve and return all dorms from the database.
exports.findAll = (req, res) => {
    Facilities.find()
    .then(facilities => {
        res.send(facilities);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
};
