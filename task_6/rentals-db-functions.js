const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'brian',
    password : 'hossana001',
    database : 'internship'
})

// get a rental object
async function getRental(id) {
    const [ rows ] = await pool.query(
        'SELECT * FROM `rental` WHERE id = ?', [id]
    );
    return rows[0]
}

// get all rentals with user specified filters
async function getRentals(location, size, price) {
    if (location && size && price) {
        const [rows] = await pool.query(
            'SELECT * FROM `rental` WHERE location = ?, size = ?, price = ?', [location, size, price]
        );
        return rows
    }
    if (location && size) {
        const [rows] = await pool.query(
            'SELECT * FROM `rental` WHERE location = ?, size = ?', [location, size]
        );
        return rows
    }
    if (location &&  price) {
        const [rows] = await pool.query(
            'SELECT * FROM `rental` WHERE location = ?, price = ?', [location, price]
        );
        return rows
    }
    if (size && price) {
        const [rows] = await pool.query(
            'SELECT * FROM `rental` WHERE size = ?, price = ?', [size, price]
        );
        return rows
    }
    if (location) {
        const [rows] = await pool.query(
            'SELECT * FROM `rental` WHERE location = ?', [location]
        );
        return rows
    }
    if (size) {
        const [rows] = await pool.query(
            'SELECT * FROM `rental` WHERE  size = ?', [size]
        );
        return rows
    }
    if (price) {
        const [rows] = await pool.query(
            'SELECT * FROM `rental` WHERE  price = ?', [price]
        );
        return rows
    }

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
async function newRental(location, price, size, ammenities) {
    const [result] = await pool.query(
        'INSERT INTO `rental` (location, price, size, ammenities) VALUES (?, ?, ?, ?)', [location, price, size, JSON.stringify(ammenities)]
    );
    const id = result.insertId
    const rental = await getRental(id)
    return rental
}

// create a new payment object
// I suppose it would be better if I could pass start_date and duration from whence I calculate the end_date
async function newPayment(rental_id, amount) {
    const [result] = await pool.query(
        'INSERT INTO `payment` (rentalID,amount) VALUES (?, ?)', [rental_id, amount]
    );
    const id = result.insertId
    const payment = await getPayment(id)
    return payment
}

// get all rentals
async function getAllRentals() {
    const [rows] = await pool.query(
        'SELECT * FROM `rental`'
    )
    return rows
}

// book a rental
async function setRentalBooked(rental_id) {
    const [result] = await pool.query(
        'UPDATE `rental` SET isBooked = true WHERE id = ?', [rental_id]
    )
    return result.insertId
}


module.exports = { getRental, getRentals, vacantRentals, getPayment, rentalPayments, newRental, newPayment, getAllRentals, setRentalBooked }