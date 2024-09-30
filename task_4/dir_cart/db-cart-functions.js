const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'brian',
    password : 'hossana001',
    database : 'internship'
})

async function newCart(productId, quantity) {
    const [result] = await pool.query(
        'INSERT INTO `cart` (product_id, quantity) VALUES (?, ?)', [productId, quantity]
    );
    return result.insertId; 
}
async function displayCart(id){
    const [rows] = await pool.query(
        'SELECT * FROM `cart` WHERE id = ?', [id]
    );
    return rows[0];
}
async function displayCarts(){
    const [rows] = await pool.query(
        'SELECT * FROM `cart`',
    );
    return rows;
}
async function updateCart(id, quantity){
    const [result] = await pool.query(
        'UPDATE `cart` SET quantity=? WHERE id=?', [quantity, id]
    );
    return result.insertId;
}
module.exports = { newCart, displayCart, updateCart, displayCarts };