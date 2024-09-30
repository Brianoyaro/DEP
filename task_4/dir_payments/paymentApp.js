const express = require('express');
const { newPayment } = require('./db-payment-functions');
// const fetch = require('node-fetch')
const axios = require('axios');
const app = express()
const port = 8001;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/newPayment', async (req,res) => {
    // send the order_id through a form submission
    const { order_id } = req.body;
    // call /orders/<order_id> to confirm such order exists ******************************
    let resp = await axios.get(`http://localhost:8000/orders/${order_id}`)
    if (!resp.data) {
        // incase the order_id doesn't exist
        res.json({'error': 'Order does not exists!'})
        return
    }
    const order = resp.data
    if (order.status === 'fulfilled') {
        // incase order is already fulfilled
        res.json({"error": "Order already completed!"})
        return
    }
    // console.log(order)
    await newPayment(order.id)
    // change order status to fulfilled after payment
    await axios.post('http://localhost:8000/updateOrder', {id: order.id, status: "fulfilled"})
    res.json({"message": 'order placed in the database'})
})

app.listen(port, () => {
    console.log(`Payment microservice is up at port ${port}`)
})