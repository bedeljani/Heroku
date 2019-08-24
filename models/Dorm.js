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
  lat: {
    type: Number,
    
  },
  long: {
    type: Number,
    
  },

  city: {
    type: String,
    
  },

  image: {
    type: String,
    },
  
  room: {
    type: Number,
    
  },
  
  desc: {
    type: String,
    
  },
  type: {
    type: String,
    
  },
  
  price: {
    type: Number,
    
  },
  // kodepos: {
  //   type : Number
  // },
  
  date: {
    type: Date,
    default: Date.now
  }
 });


// Export Contact model
var Dorm = module.exports = mongoose.model('dorm', DormSchema);
module.exports.get = function (callback, limit) {
    Dorm.find(callback).limit(limit);
  }