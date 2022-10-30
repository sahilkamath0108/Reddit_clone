const UserSchema = require("../models/userSchema");
const PostSchema = require("../models/postSchema");


const old_user_login = (req,res)=>{
    res.render("oldUser");
}

const delete_user = (req,res)=>{
    res.render("deleteUser.ejs");
}

const delete_user_post = async (req,res)=>{
    var uname = req.body.userName;

    await UserSchema.deleteOne({username: uname});

    await PostSchema.deleteMany({username: uname});

    res.redirect("/");
}

const new_user_signup = (req,res)=>{
    res.render("newUser");
}

// const new_user_signup_post = (req,res)=>{
//     var fname = req.body.fname;
//     var lname = req.body.lname;
//     var uname = req.body.uname;



//     const newUser = new UserSchema({
//         username: uname,
//         fname: fname,
//         lname: lname
//     });

//      newUser.save((err,result)=>{
//         if (err){
//             res.send("Username already exists, go back and create a new one.");
//             console.log(err);
//         }
//         else{
//             res.redirect("/"+uname);
            
//             router1.get("/"+uname, (req,res)=>{
//                 res.render("helloNewUser",{user: uname});

//             });
//         }
//     })



    
// }


module.exports ={
    old_user_login,

    delete_user,
    delete_user_post,

    new_user_signup
}