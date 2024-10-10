const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {type: String, unique: true},
    email :  {type: String, unique: true},
    password : String
})

const todoSchema = new Schema({
    title: String,
    content: String,
    // user: {type: mongoose.Types.ObjectId, ref:"User"} do after 
})

const User = mongoose.model("User", userSchema)
const Todo = mongoose.model("Todo", todoSchema)


module.exports = {
    User,
    Todo
}