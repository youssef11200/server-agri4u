const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const connectDB = () => {
  mongoose
    .connect(process.env.mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Mongodb connected....');
    })
    .catch(err => console.log(err.message));
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db...');
  });
  mongoose.connection.on('error', err => {
    console.log(err.message);
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to app termination...'
      );
      process.exit(0);
    });
  });
};
let client;

const getDB = () => {
  if (!client) {
    console.log('Creating a new client!');
    client = new MongoClient(process.env.mongo_url);
  } else {
    console.log('Reusing the old client');
  }

  const database = client.db('agri4uApp');
  const products = database.collection('Products');
  const orders = database.collection('orders');
  const users =database.collection('users')
 

  return {
    products,
    orders,
    users,
  };
};
module.exports = {connectDB, getDB}