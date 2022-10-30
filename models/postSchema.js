const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    username: {
        type: String,
    }
}, {timestamps: true});

const PostSchema = mongoose.model("post", postSchema);

module.exports = PostSchema;