const express = require('express');
const bodyParser = require("body-parser");
const app = express();
//const wtoken = require('./App/middleware/token');
var usersRouter = require('./App/routes/user.router.js');
//Veriyi Json olarak donusturuyoruz
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

app.use("/api/user",usersRouter);



// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});