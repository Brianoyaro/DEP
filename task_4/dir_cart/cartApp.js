const express = require('express')
const axios = require('axios');
const { displayCarts, newCart, updateCart, displayCart } = require('./db-cart-functions');
const app = express()
const port = 8003;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/myCart', async (req, res) => {
    const { id } = req.body;
    const cart = await displayCart(id)
    res.json(cart);
});

app.get('/myCarts', async (req, res) => {
    const carts = await displayCarts();
    res.json(carts);
});

app.post('/newCart', async (req, res) => {
    const { product_id, quantity } = req.body;
    const insertId = await newCart(product_id, quantity);
    res.json(insertId);
});

app.post('/updateCart', async (req, res) => {
    const { id, quantity } = req.body;
    const insertId = await updateCart(id, quantity);
    res.json(insertId);
});

app.listen(port, () => {
    console.log(`Cart microservice is up at port ${port}`)
})