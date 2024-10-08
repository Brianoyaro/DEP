const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'brian',
    password : 'hossana001',
    database : 'internship'
})
// get a song by its name
async function getSong(name) {
    const[rows] = await pool.query(
        'SELECT * FROM `song` WHERE name = ?', [name]
    );
    return rows[0]
};
// get all songs belonging to a given genre
async function getSongsByGenre(genre_id) {
    const [rows] = await pool.query(
        'SELECT * FROM `song` WHERE genre_id = ?', [genre_id]
    )
    return rows
}
// add a new song in the database
async function newSong(name, genre) {
    const [rows] = await pool.query(
        'SELECT id FROM `genre` WHERE name = ?', [genre]
    );
    const genre_id = rows[0].id
    console.log(genre_id)
    const [result] = await pool.query(
        'INSERT INTO `song` (name, genre_id) VALUES (?, ?)', [name, genre_id]
    )
    return result.insertId
};
// add a new genre in the database
async function newGenre(name) {
    const [result] = await pool.query(
        'INSERT INTO `genre` (name) VALUES (?)', [name]
    )
    return result.insertId
};
// add a new playlist in the database
async function newPlaylist(name, songs) {
    const [result] = await pool.query(
        // store data in song column as {'saved_songs': [song1,song2,song3, song4...s]}
        'INSERT INTO `playlist` (name, songs) VALUES (?, ?)', [name, JSON.stringify(songs)]
    )
    return result.insertId
}
// update a playlist's songs e.g adding or removing songs
async function updatePlaylist(songs, id) {
    const[rows] = await pool.query(
        // go to songs column, look for a JSON object whose key is saved_songs and replace its value with songs
        'UPDATE `playlist` SET `songs` = JSON_REPLACE(`songs`, "$.saved_songs", ?) WHERE id = ?', [songs, id]
    )
}
// get all songs in a playlist
async function getSongsInPlaylist(id) {
    const [rows] = await pool.query(
        'SELECT songs->>"$.saved_songs" FROM `playlist` WHERE id = ?', [id]
    )
    return rows
}
// recommend songs using a user's preference/musical taste
async function recommendSongs(preference) {
    // first of all get the genre associated with preference
    const [rows] = await pool.query(
        'SELECT id FROM `genre` WHERE name = ?', [preference]
    );
    const genre_id = rows[0];
    // get all songs in that genre pool
    const songs = await getSongsByGenre(genre_id)
    return songs;
}
module.exports = { getSong, getSongsByGenre, newSong, newGenre, newPlaylist, updatePlaylist, getSongsInPlaylist, recommendSongs }
