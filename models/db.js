const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/EmployeeDB",
  {
    useNewUrlParser: true, //in latest version of mongoose we have to pass this 2nd option useNewUrlParser as true
  },
  (err) => {
    if (!err) {
      console.log("MongoDB connection succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

require("./employee.model"); // here we have done with connecting mongoDb and Node.js application
