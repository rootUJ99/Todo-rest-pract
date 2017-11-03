const mongoose=require('mongoose');
let Users = mongoose.model('Users', {
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
    }
});
module.exports = {Users};