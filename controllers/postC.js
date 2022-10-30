const UserSchema = require("../models/userSchema");
const PostSchema = require("../models/postSchema");

const allPosts = async (req,res)=>{

    await UserSchema.find().populate('pop');

    PostSchema.find().sort({createdAt: -1})
       .then((result)=>{
        res.render("generalPage",{
            allPosts: result

        });
    })
}

const new_post = (req,res)=>{
    res.render("newUserPost");
}

const new_post_post = async (req,res)=>{
    var title = req.body.title;
    var post = req.body.post;
    var uname = req.body.userName;

    const newPost = new PostSchema({
        title: title,
        text: post,
        username: uname,

    });



    await newPost.save();

    UserSchema.updateOne({username: uname}, {$push:{pop: newPost._id}}, (err)=>{       //{$push: {posts: newPost}}
        if(err){
            console.log(err);
        }else{
            console.log("Posted succesfully");
        }
    });

    res.redirect("/old/allposts");
}

const delete_post = (req,res)=>{
    res.render("deletePost.ejs");
}

const delete_post_post =async (req,res)=>{
    var uname = req.body.userName;
    var title = req.body.title;

   await PostSchema.deleteOne({title: title , username: uname},(err,docs)=>{
          if(err){
              console.log(err);
          }else{
              console.log(docs);
          }
      })

    res.redirect("/old");
}

const update_post = (req,res)=>{
    res.render("updatePost.ejs");
}

const update_post_post = (req,res)=>{
    var uname = req.body.userName;
    var title = req.body.title;
    var text = req.body.post;

    PostSchema.findOneAndUpdate({title: title , username: uname}, {$set : { text : text}}, {new: true})
        .then((result)=>{
            console.log(result);
        })
        .catch((err)=>{
            console.log(err);
        });
    res.redirect("/old");
}

module.exports = {
    allPosts,
    
    new_post,
    new_post_post,

    delete_post,
    delete_post_post,

    update_post,
    update_post_post

}