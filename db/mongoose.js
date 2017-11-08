const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

if (process.env.PORT) {
    mongoose.connect(MONGOLAB_URI,{useMongoClient: true });
}
else {
    mongoose.connect('mongodb://localhost:27017/TodoApp',{useMongoClient: true });
}

//mongoose.connect(process.env.MONGOLAB_URI||'mongodb://localhost:27017/TodoApp',);
module.exports={
    mongoose
}