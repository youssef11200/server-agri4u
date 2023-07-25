const connectdb = require('../config/connectdb');

const getOrder = async (ref) => {
  return await connectdb.orders.findOne({ ref });
};

const createOrder = async (order) => {
  const result = await connectdb.orders.insertOne(order);
  return { ...order, _id: result.insertedId };
};

module.exports = {
  getOrder,
  createOrder,
};