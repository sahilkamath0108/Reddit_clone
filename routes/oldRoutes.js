const express = require("express");

const postC = require("../controllers/postC");

const userC = require("../controllers/userC");

const UserSchema = require("../models/userSchema"); //required cause embedded router.get on line 28



const router = express.Router();

//all posts

router.get("/allposts", postC.allPosts);

//log in

router.get("", userC.old_user_login);

router.post("",(req,res)=>{
    var uName = req.body.uName;
    console.log(uName);
    res.redirect("/old/"+uName);

    

    router.get("/"+uName,(req,res)=>{
          
    UserSchema.find({username: uName})
           .populate('pop')
           .then((doc)=>{
            console.log(doc);
                let user = (doc[0].fname);
                res.render("myposts",{
                    user : user,
                    dbPosts : doc[0].pop,
                    uname: uName
           })
        })
        .catch((err)=>{
            console.log(err);
            res.send("Username not found., go back and enter correct username or make a new account.");
        })
    })
})



// Making a new post


router.get("/newpost", postC.new_post);

router.post("/newpost", postC.new_post_post);


//Deleting a post


router.get("/delete", postC.delete_post);

router.post("/delete", postC.delete_post_post);


//Updating a post


router.get("/update", postC.update_post);

router.post("/update", postC.update_post_post);


//Deleting a user 

router.get("/deleteuser", userC.delete_user);

router.post("/deleteuser", userC.delete_user_post);

//

module.exports = router;