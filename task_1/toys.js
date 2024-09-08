import mysql from 'mysql2/promise';
const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'toys_db'
});

// gets all toys in the database
export async function getToys() {
    // pool.query('SELECT * FROM toys', (error, results, fields) => {
    //     if (error) throw error;
    //     return results[0];
    // })
  const [rows] = await pool.query(
    'SELECT * FROM `toys`'
  );
  return rows[0];
}

// gets a single toy using its id
export async function getToy(id) {
    const [rows] = await pool.query(
        'SELECT * FROM `toys` WHERE id = ?', [id]
    );
    return rows[0];
}

// create a new toy
export async function newToy(name, description, price, origin_country) {
    const [result] = await pool.query(
        'INSERT INTO `toys` (name, description, price, origin_country) VALUES ?, ?, ?, ?', [name, description, price, origin_country]
    );
    return result.insertId;
}

// updates a toy
export async function updateToy(id, name, description, price, origin_country) {
    const [rows] = await pool.query(
        'UPDATE `toys` SET name=?, description=?, price=?, origin_country=? WHERE id=?', [name, description, price, origin_country, id]
    );
    return rows[0];
}

// deletes a toy
export async function deleteToy(id) {
    await pool.query('DELETE FROM `toys` WHERE id=?', [id]);
}