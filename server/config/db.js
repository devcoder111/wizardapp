const mongoose = require('mongoose');


const connectDB = async() => {
    await mongoose.connect(process.env.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
      })

      console.log('MongoDB connected')
}

module.exports = connectDB;



// mongodb+srv://admin:<password>@seylabstest.vsihi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://admin:<password>@seylabstest.vsihi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
