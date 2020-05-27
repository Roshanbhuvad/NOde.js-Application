//In this file we will deal wit CRUD operations
const express = require("express");
var router = express.Router();

// Now in order to insert a new record in MongoDB first  we have to create an object of the employeeSchema inside this employeeController file
//So first we have the request statement for mongoose below and here we have variable Employee in order to store the employees schema from mongoose
const mongoose = require("mongoose");
const Employee = mongoose.model("employees");

router.get("/", (req, res) => {
  res.render("employee/addOrEdit", {
    viewTitle: "Insert employees",
  });
});

router.post("/", (req, res) => {
  // Form data returned from localhost created form will be the inside the request object body attribute
  //console.log(req.body);
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

//Noe let's look how we can insert the employee code in mongoDB from below line code
function insertRecord(req, res) {
  var employee = new Employee(); // We have to create an object of Employee schema inside that we have to populate the form controller from request body object
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.mobile = req.body.mobile;
  employee.city = req.body.city;
  employee.save((err, doc) => {
    if (!err) res.redirect("employee/list");
    else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("employee/addOrEdit", {
          viewTitle: "Insert employees",
          employee: req.body,
        });
      } else console.log("Error during record insertion : " + err);
    }
  }); // Saved these schema object
}

function updateRecord(req, res) {
  Employee.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("employee/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("employee/addOrEdit", {
            viewTitle: "Update Employee",
            employee: req.body,
          });
        } else console.log("Error during record update : " + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  //res.json("from list");
  Employee.find((err, doc) => {
    if (!err) {
      res.render("employee/list", {
        list: doc,
      });
    } else {
      console.log("Error in retrieving employee list : " + err);
    }
  });
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "fullName":
        body["fullNameError"] = err.errors[field].message;
        break;
      case "email":
        body["emailError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get("/:id", (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("employee/addOrEdit", {
        viewTitle: "Update Employee",
        employee: doc,
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/employee/list");
    } else {
      console.log("Error in employee delete :" + err);
    }
  });
});
//We need to export this router object from this controller
module.exports = router;
