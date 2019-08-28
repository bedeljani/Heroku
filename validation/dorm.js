const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateDormInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  if (
  data.name == !isEmpty(data.name) &&
  data.address == !isEmpty(data.address) &&
  data.lat  == !isEmpty(data.lat) &&
  data.long == !isEmpty(data.long) &&
  data.city == !isEmpty(data.city) &&
  data.roomNumber == !isEmpty(data.roomNumber) &&
  data.roomType == !isEmpty(data.roomType) &&
  data.width == !isEmpty(data.width) &&
  data.length == !isEmpty(data.length) &&
  data.desc == !isEmpty(data.desc) &&
  data.price == !isEmpty(data.price)
  ){
    message = "Please insert field"
  }

  // Name checks
  else if (Validator.isEmpty(data.name)) {
    errors.message = "Name field is required";
  }

  // Address checks
  else if (Validator.isEmpty(data.address)) {
    errors.message = "Address field is required";
  } 

  // lat checks
  else if (Validator.isEmpty(data.lat)) {
    errors.message = "Latitude field is required";
  }
  // Long checks
  else if (Validator.isEmpty(data.long)) {
    errors.message = "Longitude field is required";
  }
  // City checks
  else if (Validator.isEmpty(data.city)) {
    errors.message = "City field is required";
  }
  //Image checks
  // if (Validator.is(data.image)) {
  //   errors.long = "Image field is required";
  // }
  //Room checks
  else if (Validator.isEmpty(data.roomNumber)) {
    errors.message = "Room Number field is required";
  }
  else if (Validator.isEmpty(data.roomType)) {
    errors.message = "Room Type field is required";
  }
  else if (Validator.isEmpty(data.width)) {
    errors.message = "Width field is required";
  }
  else if (Validator.isEmpty(data.length)) {
    errors.message = "Length field is required";
  }
  //Desc checks
  else if (Validator.isEmpty(data.desc)) {
    errors.message = "Descripton field is required";
  }
 
  //Price checks
  else if (Validator.isEmpty(data.price)) {
    errors.message = "Price field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
