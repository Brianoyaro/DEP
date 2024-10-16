const express = require('express')
const { getRental, getAllRentals, getRentals, vacantRentals, getPayment, rentalPayments, newPayment, setRentalBooked, newRental } = require('./rentals-db-functions')
const app = express()
const port = 8000

app.use(express.json())

app.post('/rental', async (req, res) => {
    const id = req.body
    const rental = await getRental(id)
    res.json(rental)
})

app.get('/rentals/all', async (req, res) => {
    const rentals = await getAllRentals()
    res.json(rentals)
})

app.post('/rentals', async (req, res) => {
    const { location, size, price } = req.body
    const rentals = await getRentals(location, size, price)
    res.json(rentals)
})

app.get('/vacant', async (req, res) => {
    const rentals = await vacantRentals()
    res.json(rentals)
})

app.post('/payment/:id', async (req, res) => {
    const { id } = req.body
    const payment = await getPayment(id)
    res.json(payment)
})

app.get('/payments', async (req, res) => {
    const { rentalId } = req.body
    const payments = await rentalPayments(rentalId)
    res.json(payments)
})

app.post('/newRental', async (req, res) => {
    console.log(req.body)
    const { location, price, size, ammenities } = req.body
    const rental = await newRental(location, price, size, ammenities)
    res.status(201).json(rental)
})

app.post('/newPayments', async (req, res) => {
    const { rentalId, amount } = req.body
    if (amount !== 0) {
        const payment = await newPayment(rentalId, amount)
        await setRentalBooked(rentalId)
        res.status(201).json(payment)
    } else {
        res.status(400).json({'error': 'ammount can not be 0'})
    }
})

app.listen(port, () => {
    console.log(`Rentals api is up and running on port ${port}`)
})