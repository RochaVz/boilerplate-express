const bodyParser = require("body-parser");
let express = require("express");
let app = express();
require("dotenv").config();

//#1 meet the node console
// console.log("Hello World")

//4 serve static assets

app.use("/public", express.static(__dirname + "/public"));

//#7 implement a Root-Level Request Logger Middleware
app.use((req, res, next) => {
  let string = `${req.method} ${req.path} - ${req.ip}`;
  console.log(string);

  next();
});

//2# start a working express server
app.get("/", (req, res) => {
  res.send("Hello Express");
});

//3# serve an HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//#5 serve JSON on a specific route

// app.get("/json", (req, res) => {
//   res.json({ message: "Hello json" });
// });

//#6 use .env file
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

//#8 chain middleware to create a time server
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  },
);

//9# get route parameter input from the client
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

//10# get query parameter input from the client
app.get("/name", (req, res) => {
  res.json({ name: `${req.query.first} ${req.query.last}` });
});

//11# use body-parser to parse POST requests
app.use(bodyParser.urlencoded({ extended: false }));

//12# get data from POST request
app.post("/name", (req, res) => {
  res.json({ name: `${req.body.first} ${req.body.last}` });
});

module.exports = app;





































 module.exports = app;
