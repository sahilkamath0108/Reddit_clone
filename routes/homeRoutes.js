const express = require("express");

const router2 = express.Router();

router2.get("", (req,res) => {
    res.render("home",{});
})

router2.post("", (req,res)=>{
    var cBox = req.body.option;
    if(cBox.length >=2){
        console.log("Invalid");
        res.redirect("/");
    }
    else if(cBox==="n"){
        res.redirect("/new");
       
    }else if(cBox==="o"){
        
        res.redirect("/old");
        
    } 
})

module.exports = router2;