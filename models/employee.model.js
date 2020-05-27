const mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "This field is required.",
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  city: {
    type: String,
  },
});

// Custom validation for email
employeeSchema.path("email").validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid e-mail.");

// Now we will call model function as a first parameter we will specify the name of the schema and here we have the schema object
mongoose.model("employees", employeeSchema);
//in order insert a new record into mongoDB we will call employeeSchema
// now we just need to add a request statement for this employee model inside the db.js
