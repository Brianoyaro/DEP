import mysql from 'mysql2/promise';
const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'brian',
  password : 'hossana001',
  database : 'internship'
});
// retrieves a user
export async function getUser(email) {
    const [rows] = await pool.query(
        `SELECT * FROM users WHERE email = ?`, [email]
    );
    return rows; 
}
// gets all posts in the database
export async function getPosts() {
    // pool.query('SELECT * FROM toys', (error, results, fields) => {
    //     if (error) throw error;
    //     return results[0];
    // })
  const [rows] = await pool.query(
    'SELECT * FROM `posts`'
  );
  return rows;
}
 // retrieves all comments from database
export async function getComments() {
    const [rows] = await pool.query(
        `SELECT *FROM comments`
    );
    return rows;
}
// gets a single post using its id
export async function getPost(id) {
    const [rows] = await pool.query(
        'SELECT * FROM `posts` WHERE id = ?', [id]
    );
    return rows[0];
}

// create a new post
export async function newPost(post, author_id) {
    const [result] = await pool.query(
        'INSERT INTO `posts` (name, author_id) VALUES (?, ?)', [post, author_id]
    );
    return result.insertId;
}
// create a new comment
export async function newComment(comment, post_id) {
    const [result] = await pool.query(
        'INSERT INTO `comments` (comment, post_id) VALUES (?, ?)', [comment, post_id]
    );
    return result.insertId;
}
// updates a post
export async function updatePost(post, author_id, post_id) {
    const [result] = await pool.query(
        'UPDATE `toys` SET post = ?, author_id = ? WHERE post_id = ?', [post, author_id, post_id]
    );
    const post = await getPost(post_id);
    return post;
}

// deletes a toy
export async function deleteToy(id) {
    await pool.query('DELETE FROM `toys` WHERE id=?', [id]);
}
