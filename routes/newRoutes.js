const express = require("express");

const userC = require("../controllers/userC");

const UserSchema = require("../models/userSchema");

const router1 = express.Router();


router1.get("/new", userC.new_user_signup);

router1.post("/new", (req,res)=>{                   //embedded router1.get at line 33
    var fname = req.body.fname;
    var lname = req.body.lname;
    var uname = req.body.uname;



    const newUser = new UserSchema({
        username: uname,
        fname: fname,
        lname: lname
    });

     newUser.save((err,result)=>{
        if (err){
            res.send("Username already exists, go back and create a new one.");
            console.log(err);
        }
        else{
            res.redirect("/"+uname);
            
            router1.get("/"+uname, (req,res)=>{
                res.render("helloNewUser",{user: uname});

            });
        }
    })



    
});

module.exports= router1;