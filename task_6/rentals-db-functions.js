const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'brian',
    password : 'hossana001',
    database : 'internship'
})

// get a rental object
async function getRental(id) {
    const [rows] = await pool.query(
        'SELECT * FROM `rental` WHERE id = ?', [id]
    );
    return rows[0]
}

// get all rentals with user specified filters
async function getRentals(location, size, price) {
    const [rows] = await pool.query(
        'SELECT * FROM `rental` WHERE location = ?, size = ?, price = ?', [location, size, prices]
    );
    return rows
}

// get all vacant rentals
async function vacantRentals() {
    const [rows] = await pool.query(
        // What if I allow user filters to search for vacant rooms in a given locality?
        'SELECT * FROM `rental` WHERE isBooked = false'
    );
    return rows
}

// get a payment object
async function getPayment(id) {
    const [rows] = await pool.query(
        'SELECT * FROM `payment` WHERE id = ?', [id]
    );
    return rows[0]
}

// get payments associated with a particular rental object
async function rentalPayments(rental_id) {
    const [rows] = await pool.query(
        'SELECT * FROM `payment` WHERE rentalID = ?', [rental_id]
    );
    return rows
}

// create a new rental object
async function newRental(location, price, size, ammenities, is_booked) {
    const [result] = await pool.query(
        'INSERT INTO `rental` (location, price, size, ammenities, isBooked) VALUES (?, ?, ?, ?, ?)', [location, price, size, JSON.stringify(ammenities), is_booked]
    );
    const id = result.insertId
    const rental = await getRental(id)
    return rental
}

// create a new payment object
// I suppose it would be better if I could pass start_date and duration from whence I calculate the end_date
async function newPayment(rental_id, start_date, end_date, duration) {
    const [result] = await pool.query(
        'INSERT INTO `payment` (rentalID, startDate, endDate, duration) VALUES (?, ?, ?, ?)', [rental_id, start_date, end_date, duration]
    );
    const id = result.insertId
    const payment = await getPayment(id)
    return payment
}