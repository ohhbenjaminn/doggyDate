const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

// db.collections['post'].drop(function(err) {
//     console.log('collection dropped')
// })
// console.log('collections', mongoose.connection.collections)

db.on('error', function(err){
  console.log(`Mongodb error: ${err}`)
})
