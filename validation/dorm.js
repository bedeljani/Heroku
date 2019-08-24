const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateDormInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.lat  = !isEmpty(data.lat) ? data.lat : "";
  data.long = !isEmpty(data.long) ? data.long : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.image = !isEmpty(data.image) ? data.image : "";
  data.room = !isEmpty(data.room) ? data.room : "";
  data.desc = !isEmpty(data.desc) ? data.desc : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.price = !isEmpty(data.price) ? data.price : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Address checks
  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  } 

  // lat checks
  if (Validator.isEmpty(data.lat)) {
    errors.lat = "Latitude field is required";
  }
  // Long checks
  if (Validator.isEmpty(data.long)) {
    errors.long = "Longitude field is required";
  }
  // City checks
  if (Validator.isEmpty(data.city)) {
    errors.long = "City field is required";
  }
  //Image checks
  // if (Validator.is(data.image)) {
  //   errors.long = "Image field is required";
  // }
  //Room checks
  if (Validator.isEmpty(data.room)) {
    errors.long = "Image field is required";
  }
  //Desc checks
  if (Validator.isEmpty(data.desc)) {
    errors.long = "Descripton field is required";
  }
  //Type checks
  if (Validator.isEmpty(data.type)) {
    errors.long = "Type Room field is required";
  }
  //Price checks
  if (Validator.isEmpty(data.price)) {
    errors.long = "Price field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
