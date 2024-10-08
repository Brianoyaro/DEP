const express = require('express');
const { getSong, getSongsByGenre, newPlaylist, newSong, getSongsInPlaylist, updatePlaylist, recommendSongs, newGenre } = require('./server_db-functions');
const app = express()
const port = 8000

app.use(express.json())
// search for specific song
app.post('/search/song', async (req, res) => {
    const { songName } = req.body
    const song = await getSong(songName)
    res.json(song)
});
// get songs associated with a genre
app.post('/search/genre/songs', async (req, res) => {
    const { genreId } = req.body
    const songs = await getSongsByGenre(genreId)
    res.json(songs)
});
// create a new playlist
app.post('/new/playlist', async (req,res) => {
    let { name, songs } =req.body
    if (!songs) {
        songs = { savedSongs: [] }
    };
    const insertId = await newPlaylist(name, songs)
    res.status(201).json(insertId)
});
// create a new genre
app.post('/new/genre', async (req, res) => {
    const { name } = req.body
    const insertId = await newGenre(name)
    res.status(201).json(insertId)
})
// create a new song
app.post('/new/song', async (req,res) => {
    const { name, genre } = req.body
    const insertId = await newSong(name, genre)
    res.status(201).json(insertId)
});
// get all songs in a playlist
app.post('/playlist/songs', async (req, res) => {
    const { id } = req.body
    const songs = await getSongsInPlaylist(id)
    res.json(songs)
});
// update a playlist
app.post('/update/playlist', async (req, res) => {
    const { songs, id } = req.body
    const insertId = await updatePlaylist(songs, id)
    res.json(insertId)
});
// recommend songs using a user's musical taste/preference
app.post('/recommend/songs', async (req, res) => {
    const { preference } = req.body
    const songs = await recommendSongs(preference)
    res.json(songs)
});

app.listen(port, () => {
    console.log(`Music streaming api running on port ${port}`)
})