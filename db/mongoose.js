const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

if (process.env.PORT) {
    mongoose.connect('mongodb://admin:nimda@ds153015.mlab.com:53015/rest-node',{useMongoClient: true });
}
else {
    mongoose.connect('mongodb://localhost:27017/TodoApp',{useMongoClient: true });
}

//mongoose.connect(process.env.MONGOLAB_URI||'mongodb://localhost:27017/TodoApp',);
module.exports={
    mongoose
}