const {mongoose}=require('./db/mongoose');
const {Todo}=require('./models/todo');
const {Users} = require('./models/users');
const express=require('express');
const bodyParser=require('body-parser');
let app=express();
app.use(bodyParser.json());

//POST req
app.post('/todos',(req,res)=>{
    let aTodo=new Todo({
        text:req.body.text,
        completed:req.body.completed,
        completedAt: req.body.completedAt,
    });
    aTodo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    })
});
app.listen(3000,()=>{
    console.log('Server started');
});


// let Todo= mongoose.model('Todo',{
//     text:{
//         type:String,
//         trim:true,
//         minlength:1,
//         required:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     },
//     completedAt:{
//         type:Number,
//         default:null
//     }
// });
//  let newTodo= new Todo({
//      text:'Cook Dinner'
//  });
//  newTodo.save().then((doc)=>{
//      console.log('Saved todo',(doc,undefined,2));
//  },(err)=>{
//      console.log('unable to save todo',e);
//  });

//  let otherTodo=new Todo({
//      text:'Have the Dinner',
//      completed:true,
//      completedAt:9
//  });
//  otherTodo.save().then((doc)=>{
//      console.log('Saved todo',JSON.stringify(doc,undefined,2));
//  },(err)=>{
//      console.log('Unable to save todo',err);
//  });

//  //use model
//  let User=mongoose.model('Users',{
//      name:{
//          type:String,
//          trim:true,
//          minlength:1,
//          required:true,
//      },
//      email:{
//          type:String,
//          trim:true,
//          minlength:1,
//          required:true
//      }
//  });

//  let newUser= new User({
//      name:'UJwal Arak',
//      email:'ujwal99arak@gmail.com'
//  })
//  newUser.save().then((doc)=>{
//      console.log('New User is added as',JSON.stringify(doc,undefined,2));
//  },(err)=>{
//      cosnole.log('Unable to add user',err);
//  });