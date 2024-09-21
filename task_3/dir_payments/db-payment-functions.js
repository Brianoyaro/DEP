const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'brian',
    password : 'hossana001',
    database : 'internship'
})

async function newPayment(order_id) {
    const [result] = await pool.query(
        'INSERT INTO `payment` (order_id) VALUES (?)', [order_id]
    );
    return result.insertId; 
}

module.exports = { newPayment };