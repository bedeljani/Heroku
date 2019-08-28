const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DormSchema = new Schema({
  
  name: {
    type: String,
    },

  address: {
    type: String,
    },

  lat : String,
  long : String,


  city: String,     

  image: [String],

  desc: { type: String,
  },
  
    roomNumber: Number,
    roomType: String,
    width: Number,
    length: Number,
        
     

    facilities: [String]
  ,

  price : {
    type: Number
  },
  
  date: {
    type: Date,
    default: Date.now
  },

  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
 });


// Export Contact model
var Dorm = module.exports = mongoose.model('dorm', DormSchema);
module.exports.get = function (callback, limit) {
    Dorm.find(callback).limit(limit);
  }