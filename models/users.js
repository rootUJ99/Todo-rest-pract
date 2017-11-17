const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
let UsersSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        minlength: 6,
        required: true,
        unique:true,
        validate:{
        validator: validator.isEmail,
        message: '{VALUE} is not a valid emailid!'
        }
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    tokens:[{
        access:{
            type:String,
            required:true
    },
    token:{
            type: String,
            required: true
    }}]
});
UsersSchema.methods.generateAuthToken=function(){
    let user= this;
    let access='auth';
    let token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
    user.tokens.push({access,token});
    return user.save().then(()=>{
        return token;
    });
}; 
let Users = mongoose.model('Users', UsersSchema);
module.exports = {Users};