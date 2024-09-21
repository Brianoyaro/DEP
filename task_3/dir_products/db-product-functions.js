const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'brian',
    password : 'hossana001',
    database : 'internship'
})

async function newProduct(name, quantity) {
    const [result] = await pool.query(
        'INSERT INTO `product` (name, quantity) VALUES (?, ?)', [name, quantity]
    );
    return result.insertId; 
}
async function getProducts() {
    const [ rows ] = await pool.query(
        'SELECT * FROM product'
    );
    return rows[0];
}
async function getProduct(id){
    const [rows] = await pool.query(
        'SELECT * FROM `product` WHERE id = ?', [id]
    );
    return rows[0];
}
async function updateProduct(id, quantity){
    const [result] = await pool.query(
        'UPDATE `procuct` SET quantity=? WHERE id=?', [quantity, id]
    );
    return result.insertId;
}

module.exports = { newProduct, getProduct, getProducts, updateProduct };