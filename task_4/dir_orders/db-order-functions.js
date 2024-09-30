const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'brian',
    password : 'hossana001',
    database : 'internship'
})

async function newOrder(productId, quantity, status) {
    const [result] = await pool.query(
        'INSERT INTO `order` (product_id, quantity, status) VALUES (?, ?, ?)', [productId, quantity, status]
    );
    return result.insertId; 
}
async function displayOrder(id){
    const [rows] = await pool.query(
        'SELECT * FROM `order` WHERE id = ?', [id]
    );
    return rows[0];
}
async function displayOrders(){
    const [rows] = await pool.query(
        'SELECT * FROM `order`',
    );
    return rows;
}
async function updateOrder(id, status){
    const [result] = await pool.query(
        'UPDATE `order` SET status=? WHERE id=?', [status, id]
    );
    return result.insertId;
}
module.exports = { newOrder, displayOrder, updateOrder, displayOrders };