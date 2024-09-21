const express = require('express');
const { newPayment } = require('./db-payment-functions');
const app = express()
const port = 8001;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/newPayment', async (req,res) => {
    // send the order_id through a form submission
    const order_id = req.body;
    // call /orders/order_id to confirm such order exists ******************************
    let order = ajax.get(`http://localhost:8000/orders/${order_id}`)
    if (!order) {
        // incase the order_id doesn't exist
        res.json({'error': 'Order does not exists!'})
    }
    // endcall *************************************************************************
    await newPayment(order_id)
    res.json({"message": 'order placed in the database'})
})

app.listen(port, () => {
    console.log(`Payment microservice is up at port ${port}`)
})