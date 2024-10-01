const express = require('express')
const { newOrder, displayOrder, updateOrder, displayOrders } = require('./db-order-functions.js')
// const fetch = require('node-fetch')
const axios = require('axios');
const app = express()
const port = 8000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/newOrder', async (req, res) => {
    let { product_id, quantity, status } = req.body;
    if (!status) {
        status = 'pending'
    };
    // call /products/product_id *****************************************************************************
    const resp = await axios.get(`http://localhost:8002/products/${product_id}`);
    if (!resp.data) {
        // incase there was an error
        res.json({'error': 'product not available'})
        return
    }
    const product = resp.data
    // console.log(resp.data)
    if (quantity > product.quantity) {
        // incase user orders for more than available goods
        res.json({'error': 'Too may products than in store.'})
        return
    }
    // call /updateProduct and reduce the quantity in the database before placing an order
    quantity = product.quantity - quantity;
    // console.log(quantity)
    const insert_id = await newOrder(product.id, quantity, status);
    const order = await displayOrder(insert_id);
    await axios.post(`http://localhost:8002/updateProduct`, {
        id: product.id,
        quantity: quantity
    });
    res.json(order)
})

app.post('/updateOrder', async (req,res) => {
    const { id, status } = req.body;
    await updateOrder(id, status);
    const order = await displayOrder(id)
    res.json(order)
})

app.get('/orders', async (req, res) => {
    const orders = await displayOrders();
    res.json(orders)
})

app.get('/orders/:id', async (req, res) => {
    const id = +req.params.id;
    const order = await displayOrder(id);
    res.json(order)
})

app.listen(port, () => {
    console.log(`Order microservice is up at port ${port}`)
})