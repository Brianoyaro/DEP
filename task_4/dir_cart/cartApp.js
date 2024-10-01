const express = require('express')
const axios = require('axios');
const { displayCarts, newCart, updateCart, displayCart, doesProductExist } = require('./db-cart-functions');
const app = express()
const port = 8003;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/myCart', async (req, res) => {
    const { id } = req.body;
    const cart = await displayCart(id)
    // check if cart exists
    if (!cart) {
        res.status(404).json({"error": "Cart does not exist. Create a new cart."})
        return
    }
    res.json(cart);
});

app.get('/myCarts', async (req, res) => {
    const carts = await displayCarts();
    res.json(carts);
});

app.post('/newCart', async (req, res) => {
    let { product_id, quantity } = req.body;
    // check if product existst in database first.
    const resp = await axios.get(`http://localhost:8002/products/${product_id}`);
    if (!resp.data) {
        // incase there was an error
        res.json({'error': 'product not avaiable'})
        return
    }
    const product = resp.data
    // ***************
    // check if there is a cart with same product
    const cart = await doesProductExist(product_id);
    if (cart) {
        // Don't create a new cart, just use the existing cart.
        if (quantity > product.quantity || (quantity + cart.quantity) > product.quantity) {
            quantity = product.quantity
        } else {
            // console.log(quantity)
            quantity += cart.quantity
        }
        const insertId = await updateCart(product.id, quantity)
        res.json({"message": "Item added to existing cart."})
        return 
    }
    // ***************
    // check if cart quantity is greater than that in database.
    if (quantity > product.quantity) {
        quantity = product.quantity
    }
    const insertId = await newCart(product_id, quantity);
    res.json(insertId);
});

app.post('/updateCart', async (req, res) => {
    const { id, quantity } = req.body;
    // check if cart exists
    const cart =  await displayCart(id)
    if (!cart) {
        res.status(404).json({"error": "Cart does not exist. Create a new cart."})
        return
    }
    const insertId = await updateCart(id, quantity);
    res.json(insertId);
});

app.listen(port, () => {
    console.log(`Cart microservice is up at port ${port}`)
})