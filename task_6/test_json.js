const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'brian',
    password : 'hossana001',
    database : 'test'
})
async function testJson() {
    const jsonData = {
        age: 30,
        hobbies: ['sleeping', 'eating', 'swimming'],
        location: {
            city: 'Mombasa',
            country: 'Kenya'
        }
    };
    const name = 'John Doe';
    const sql = 'INSERT INTO   `test_users` (name, data) VALUES (?, ?)';
    const insertId = await pool.query(sql, [name, JSON.stringify(jsonData)]);
    console.log(insertId);
    await pool.end();
}
//testJson()

async function testSelectJson() {
    const [rows] = await pool.query(
        'SELECT * FROM `test_users`'
    );
    let object = rows[0]
    console.log(object)
    pool.end()
}

testSelectJson()
// select data->>"$.location" from test_users where name='John Doe2'