const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'brian',
    password : 'hossana001',
    database : 'internship'
})

async function newReview(productId, content) {
    const [result] = await pool.query(
        'INSERT INTO `review` (product_id, content) VALUES (?, ?)', [productId, content]
    );
    return result.insertId; 
}
async function displayReviews(product_id){
    const [rows] = await pool.query(
        'SELECT * FROM `review` WHERE product_id = ?', [product_id]
    );
    return rows[0];
}

module.exports = { newReview, displayReviews };