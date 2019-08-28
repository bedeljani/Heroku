const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  if(data.email == !isEmpty(data.email) &&
  data.password == !isEmpty(data.password)) {
 errors.message = "Please insert field"
  }

  // Email checks
  else if (Validator.isEmpty(data.email)) {
    errors.message = "Email field is required";
  } 
  else if (!Validator.isEmail(data.email)) {
    errors.message = "Email is invalid";
  }
  // Password checks
  else if (Validator.isEmpty(data.password)) {
    errors.message = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
