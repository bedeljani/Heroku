const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  if(data.name == !isEmpty(data.name)  &&
  data.email == !isEmpty(data.email)  &&
  data.password == !isEmpty(data.password) &&
  data.confirm_password == !isEmpty(data.confirm_password) ){
    errors.message = "Please insert field";
  }

  // Name checks
  else if (Validator.isEmpty(data.name)) {
    errors.message = "Name field is required";
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

  else if (Validator.isEmpty(data.confirm_password)) {
    errors.message = "Confirm password field is required";
  }

  else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.message = "Password must be at least 6 characters";
  }

  else if (!Validator.equals(data.password, data.confirm_password)) {
    errors.message = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
