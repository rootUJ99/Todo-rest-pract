

const {mongoose}=require('./db/mongoose');
const {ObjectId}=require('mongodb');
const {Todo}=require('./models/todo');
const {Users} = require('./models/users');
const express=require('express');
const _ =require('lodash');
const bodyParser=require('body-parser');
let app=express();
const port=process.env.PORT||3000;
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

app.get('/todos',(req,res)=>{
    Todo.find().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});

//retrive from get 
app.get('/todos/:id',(req,res)=>{
   // res.send(req.params);
   let id = req.params.id;
   
   if (!ObjectId.isValid(id)) { 
       return res.status(404).send();
    }
    Todo.findById(id).then((doc)=>{
        if(!doc){
            return res.status(404).send();
        }
            res.send({doc});
    }).catch((err) => {
        res.status(400).send();
    });
});

 //delete by id
app.delete('/todos/:id',(req,res)=>{
    let id =req.params.id;
    if (!ObjectId.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((doc)=>{
        if(!doc){
            return res.status(404).send();
        }
            res.send({doc});
    }).catch((err) => {
        res.status(400).send();
    });
});

//update by id using patch
app.patch('/todos/:id',(req,res)=>{
    let id=req.params.id;
    let body=_.pick(req.body,['text','completed']);
    if (!ObjectId.isValid(id)){
        return res.status(404).send();
    }
    if(_.isBoolean(body.completed)&&body.completed){
        body.completedAt=new Date().getTime();
    }else{
        body.completed=false;
        body.completedAt=null;
    }
    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((doc)=>{
        if(!doc){
            return res.status(404).send();
        }
        res.send({doc});
    }).catch((e)=>{
        res.status(400).send();
    })
});

app.listen(port,()=>{
    console.log('Server started at ',port);
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