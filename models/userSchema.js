const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    pop: [{
        type: mongoose.Types.ObjectId,
        ref: 'post'
    }]

}, {timestamps: true});


//validate username
userSchema.path("username").validate(async (username)=>{
    const usernameCount = await mongoose.models.user.countDocuments({username})
    return !usernameCount
}, "Username already exists.");

const UserSchema = mongoose.model("user", userSchema);

module.exports = UserSchema;