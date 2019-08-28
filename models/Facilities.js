const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facilitiesSchema = new Schema({
    
    facility :[{
        name: String,
        icon: String
    }],
    user: [{type: Schema.Types.ObjectId,
            ref: 'Dorm' }]
    

}) 

module.exports = Facilities = mongoose.model('facilities', facilitiesSchema);