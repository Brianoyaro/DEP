const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'brian',
  password : 'hossana001',
  database : 'internship'
});
// retrieves a user
async function getUserByEmail(email) {
    const [rows] = await pool.query(
        `SELECT * FROM users WHERE email = ?`, [email]
    );
    return rows; 
}
async function getUserById(id) {
    const [rows] = await pool.query(
        `SELECT * FROM users WHERE id = ?`, [id]
    );
    return rows; 
}

async function getAllPosts() {
    const [rows] = await pool.query(
        `SELECT * FROM posts`
    );
    return rows; 
}

async function getPostById(id) {
    const [rows] = await pool.query(
        `SELECT * FROM posts WHERE id = ?`, [id]
    );
    return rows; 
}


async function getCommentsByPostId(id) {
    const [rows] = await pool.query(
        `SELECT * FROM comments WHERE post_id = ?`, [id]
    );
    return rows; 
}

// create a new user
async function newUser(name, email, hashedPassword) {
    const [result] = await pool.query(
        'INSERT INTO `users` (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]
    );
    return result.insertId;
}

// create a new comment
async function newComment(comment, post_id, author_id) {
    const [result] = await pool.query(
        'INSERT INTO `comments` (comment, post_id, author_id) VALUES (?, ?, ?)', [comment, post_id, author_id]
    );
    return result.insertId;
}
// create a new post
async function newPost(title, post, author_id) {
    try {
        const [result] = await pool.query(
            'INSERT INTO `posts` (title, post, author_id) VALUES (?, ?, ?)', [title, post, author_id]
        );
        return result.insertId;
    } catch (e) {
        console.log(e)
    }
}
// updates a post
async function updatePostById(title, post, author_id, post_id) {
    const [result] = await pool.query(
        'UPDATE `posts` SET title = ?, post = ?, author_id = ? WHERE id = ?', [title, post , author_id, post_id]
    );
    return result.insertId;
}

// deletes a post
async function deletePost(id) {
    await pool.query('DELETE FROM `posts` WHERE id=?', [id]);
}
module.exports = { getUserByEmail, getUserById, getAllPosts, getPostById, getCommentsByPostId, newUser, newComment, newPost, updatePostById, deletePost}