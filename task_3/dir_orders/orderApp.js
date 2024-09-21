const express = require('express')
const { newOrder, displayOrder, updateOrder, displayOrders } = require('./db-order-functions.js')
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
    const product = await ajax.get(`http://localhost:8002/products/${product_id}`);
    if (response.status_code !== 200) {
        // incase there was an error
        res.json({'error': 'product not avaiable'})
    }
    if (quantity > product.quantity) {
        // incase user orders for more than available goods
        res.json({'error': 'Too may products than in store.'})
    }
    // call /updateProduct and reduce the quantity in the database before placing an order
    quantity = product.quantity - quantity;
    let response = await ajax.post(`http://localhost:8002/updateProduct`)
    // end call*************************************************************************************************
    const insert_id = await newOrder(product_id, quantity, status);
    const order = await displayOrder(insert_id);
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
    const id = +req.params.it;
    const order = await displayOrder(id);
    res.json(order)
})

app.listen(port, () => {
    console.log(`Order microservice is up at port ${port}`)
})