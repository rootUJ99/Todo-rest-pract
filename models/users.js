const mongoose=require('mongoose');
let UsersSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 1,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    }})
let Users = mongoose.model('Users', UsersSchema);
module.exports = {Users};