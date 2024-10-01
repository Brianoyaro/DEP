const express = require('express')
const axios = require('axios');
const { newReview, displayReviews } = require('./db-review-functions');
const app = express()
const port = 8004;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/reviews', async (req, res) => {
    const { product_id } = req.body;
    // check if product exists
    const resp = await axios.get(`http://localhost:8002/products/${product_id}`);
    if (!resp.data) {
        res.json({'error': 'product not available'})
        return
    }
    const review = await displayReviews(product_id)
    res.json(review);
});

app.post('/newReview', async (req, res) => {
    const { product_id, content } = req.body;
    // check if product exists
    const resp = await axios.get(`http://localhost:8002/products/${product_id}`);
    if (!resp.data) {
        res.json({'error': 'product not available'})
        return
    }
    const insertId = await newReview(product_id, content);
    res.json(insertId);
});


app.listen(port, () => {
    console.log(`Review microservice is up at port ${port}`)
})