const express = require('express');
const { newProduct, getProducts, getProduct, updateProduct } = require('./db-product-functions');
const fetch = require('node-fetch')
const app = express()
const port = 8002;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/newProduct', async (req,res) => {
    const { name, quantity } = req.body;
    const product = await newProduct(name, quantity);
    res.status(201).json(product);
})

app.get('/products', async (req,res) => {
    const products = await getProducts();
    res.json(products);
})

app.get('/products/:id', async(req,res) => {
    const id = +req.params.id;
    // console.log(typeof id)
    const product = await getProduct(id);
    res.json(product);
})

app.post('/updateProduct', async(req,res) => {
    const { id, quantity } = req.body;
    await updateProduct(id, quantity);
    const product = await getProduct(id);
    res.json(product);
})

app.listen(port, () => {
    console.log(`Product microservice is up at port ${port}`)
})