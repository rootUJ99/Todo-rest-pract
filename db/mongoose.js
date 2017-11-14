const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
if (process.env.PORT) {
    mongoose.connect('mongodb://root:toor@ds153015.mlab.com:53015/rest-node', { useMongoClient: true });
}
else {
    mongoose.connect('mongodb://localhost:27017/TodoApp', { useMongoClient: true });
}
module.exports={
    mongoose
}