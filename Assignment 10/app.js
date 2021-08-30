const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session')
const app = express();

var configRoutes = require("./routes");
const exphbs = require("express-handlebars");

app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const static = express.static(__dirname + '/public');
app.use('/public', static);

app.use(
  session({
    name: 'AuthCookie',
    secret: "Alohomora",
    saveUninitialized: true,
    resave: false,
  })
)

app.use( (req, res, next) => {
  // console.log(req.session.user)
  if (req.session.user == "" || req.session.user == undefined) {
    const str = "(Non-Authenticated User)"
    console.log( new Date().toUTCString(), req.method, req.originalUrl, str)
    next();
  } else {
    const str = "(Authenticated User)"
    console.log( new Date().toUTCString(), req.method, req.originalUrl, str)
    next();
  }
})

configRoutes(app); 

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
  });
