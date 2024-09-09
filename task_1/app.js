import express from 'express';
import { getToys, getToy, newToy, deleteToy, updateToy } from './toys.js';

const app = express();

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded form bodies
app.use(express.urlencoded({ extended: true }));

// read all toys
app.get('/toys', async (req, res) => {
    const toys = await getToys();
    res.json(toys);
})

// read a single toy
app.get('/toys/:id', async (req, res) => {
    const id = req.params.id;
    const toy = await getToy(id);
    res.json(toy);
})

// create a new toy entry
app.post('/new', async (req, res) => {
    const { name, description, price, origin_country } = req.body;
    const insertedId = await newToy(name, description, price, origin_country);
    const toy = await getToy(insertedId);
    res.status(201).json(toy);
})

// update a toy entry
app.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const { name, description, price, origin_country } = req.body;
    const toy = await updateToy(id, name, description, price, origin_country);
    res.json(toy);
})

// delete a toy entry
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await deleteToy(id);
    res.json({'Message': 'The toy was succeessfully deleted!'});
})

app.listen(8080, () => {
    console.log('listening on port 8080')
})
