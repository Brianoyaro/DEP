import mysql from 'mysql2/promise';
const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'brian',
  password : 'hossana001',
  database : 'internship'
});
// retrieves a user
export async function getUserByEmail(email) {
    const [rows] = await pool.query(
        `SELECT * FROM users WHERE email = ?`, [email]
    );
    return rows; 
}

export async function getUserById(id) {
    const [rows] = await pool.query(
        `SELECT * FROM users WHERE id = ?`, [id]
    );
    return rows; 
}

export async function getAllPosts() {
    const [rows] = await pool.query(
        `SELECT * FROM posts`
    );
    return rows; 
}

export async function getPostById(id) {
    const [rows] = await pool.query(
        `SELECT * FROM posts WHERE id = ?`, [id]
    );
    return rows; 
}


export async function getCommentsByPostId(id) {
    const [rows] = await pool.query(
        `SELECT * FROM comments WHERE post_id = ?`, [id]
    );
    return rows; 
}

// create a new user
export async function newUser(name, email, hashedPassword) {
    const [result] = await pool.query(
        'INSERT INTO `users` (name, email, password) VALUES (?, ?)', [name, email, hashedPassword]
    );
    return result.insertId;
}

// create a new comment
export async function newComment(comment, post_id, author_id) {
    const [result] = await pool.query(
        'INSERT INTO `comments` (comment, post_id, author_id) VALUES (?, ?, ?)', [comment, post_id, author_id]
    );
    return result.insertId;
}
// create a new post
export async function newPost(post, author_id) {
    const [result] = await pool.query(
        'INSERT INTO `posts` (title, post, author_id) VALUES (?, ?)', [title, post, author_id]
    );
    return result.insertId;
}
// updates a post
export async function updatePostById(post, author_id, post_id) {
    const [result] = await pool.query(
        'UPDATE `toys` SET title = ?, post = ?, author_id = ? WHERE post_id = ?', [post.title, post.post , author_id, post_id]
    );
    return result.insertId;
}

// deletes a post
export async function deletePost(id) {
    await pool.query('DELETE FROM `posts` WHERE id=?', [id]);
}