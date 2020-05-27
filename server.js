require("./models/db");

//Now it's time to start the express server so will add below request statement for express with const express
const express = require("express");

//First of all we will add the below request statement(path) for the path which is already the inside node.js application, In order to work with path in node.js application
const path = require("path");

// then we have request statement for express handlebars
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const insecureHandlebars = allowInsecurePrototypeAccess(exphbs);

//first we need to include the request statement for the body-parser package
const bodyparser = require("body-parser");
// First of app will add the request statement for employeeController below
const employeeController = require("./controllers/employeeController");

var app = express();

app.use(
  bodyparser.urlencoded({
    extended: true, //we will use the use function from middleware & we have called  this URL encoded function that we have this configuration
  })
);
app.use(bodyparser.json()); // We want to convert that into a JSON format
//Now let's configure middleware for handlebars, we Will set the view directory for this application
app.set("views", path.join(__dirname, "/views/")); // 1st parameter is views and 2nd parameter we have to pass the folder directory where we save the views for this application
//In path.join method we have first parameter is reserved __dirname variable which is base file directory for this project, In that we have to join /views/ folder

//let's configure the express engine for handlebars for that we can call the engine function
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/",
  })
); //as a first parameter have hbs, then we call function from the express handlebars inside that we have an object it may contain the configuration details for the handlebars
// In the above code set the extension for handlebars view files it will be 'hbs', then we will set the default view for this application default layout is main layout
app.set("view engine", "hbs");
app.listen(3000, () => {
  console.log("Express server started at port: 3000");
});

//Now let's configure routing for the employeeController.js inside this root server file
// Now in order to add a route for this employeeController we need to call use method of middleware function
app.use("/employee", employeeController); // /employee is base URL for this employeeController
