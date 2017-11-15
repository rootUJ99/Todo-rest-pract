const mongoose = require('mongoose');
let TodoSchema= mongoose.Schema({
    text: {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    },
    completed: {
        type: Boolean,
        default: true
    },
    completedAt: {
        type: Number,
        default: null
    }
});
let Todo = mongoose.model('Todo',TodoSchema );
module.exports={Todo};