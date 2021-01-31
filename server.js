//check if we are running in production environment
//we don't want to load this variables unless we
// are in production environment
if(process.env.NODE_ENV !== "production"){
    //load off dependencies
    require("dotenv").config();
}

//import express
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

// make the server know that the routers exist 
const indexRouter = require("./routes/index");

//set up view engine with ejs as view engine
//  "EJS is a simple templating language that 
// lets you generate HTML markup with plain JavaScript"
app.set("view engine", "ejs");

//where our views are coming from
app.set("views", __dirname + "/views");

// every single file will be put inside this layout file
app.set("layout", "layouts/layout");

// tell express we will use express layouts
app.use(expressLayouts);

//tell where our public files will be (stylesheets images etc)
app.use(express.static("public"));

//import mongoose a package for mongoDB
const mongoose = require("mongoose");
// set up connexion with database
// pass a string for the url using environnment variables
// i don't get it but ok
// 
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, 
    useUnifiedTopology: true});

const db = mongoose.connection;

//log if we are connected or not
// if we aren't connected
db.on("error", error => console.error(error));
// if we are connected ; the once means it will run only once
db.once("open", () => console.log("WE ARE CONNECTED PEOPLE"));

app.use("/", indexRouter);

// we want to listen at a certain port
// port 3000
app.listen(process.env.PORT || 3000);