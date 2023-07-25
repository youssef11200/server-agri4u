const express = require('express');
const orderRoutes = express.Router();
const { createOrder, getOrder } = require('../data/orders');

orderRoutes.get('/:reference',  async (req, res) => {
    const order = await getOrder(req.params.reference);
    if (!order) {
        res.status(404).send({ status: 'FAILED', error: 'Order not found' });
        return;
      }
    
      res.send({ status: 'OK', data: order });
    });

orderRoutes.post('/', async (req, res) => {
    const orderData = req.body;
    const ref = (Math.random() + 1).toString(36).substring(7);
    orderData.ref = ref;
  
    const newOrder = await createOrder(orderData);
  
    res.status(201).send({ status: 'OK', data: newOrder });
  });
module.exports = orderRoutes;