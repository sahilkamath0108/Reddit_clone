const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const oldRoutes = require("./routes/oldRoutes");
const newRoutes = require("./routes/newRoutes");
const homeRoutes = require("./routes/homeRoutes");

const app = express();


const dbURI = "mongodb+srv://spectre:spectre@cluster0.lgogv37.mongodb.net/reddit-clone?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>app.listen(3000))
  .catch((err)=>console.log(err));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set("view engine", "ejs")

//home route

app.use("/",homeRoutes);

//new user signup route

app.use(newRoutes);

//old user routes

app.use("/old",oldRoutes);



