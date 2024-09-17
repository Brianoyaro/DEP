// load environment variables from .env file and set them inside process.env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport')
const flash = require('express-flash');
const session = require('express-session');
const intializePassport = require('./passport-config');
const methodOverride = require('method-override')
import { getUserByEmail, getAllPosts, getUserById, getPostById, getCommentsByPostId, newUser, newComment, newPost, updatePostById, deletePost } from './db-functions';
const app = express();

intializePassport(passport, getUserByEmail)
const PORT = 8080;
const saltRounds = 10;

// set the view engine to use ejs syntax
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitiallized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// protect our route using checkAuthenticated middleware
app.get('/', checkAuthenticated, (req, res) => {
    const posts = getAllPosts()
    res.render('index.ejs', { posts })
})
//!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get('/newPost', checkAuthenticated, (req, res) => {
    res.render('newPost.ejs')
})

app.post('/newPost', checkAuthenticated, (req, res) => {
    newPost(req.body.title, req.body.post, req.user.id)
    res.redirect('/')
})

app.get('/updatePost/:id', checkAuthenticated, (req, res) => {
    const id = +req.params.id
    const post = getPostById(id)
    res.render('updatePost.ejs', { post })
})

app.post('/updatePost/:id', checkAuthenticated, (req, res) => {
    const id = +req.params.id
    const post = getPostById(id)
    updatePostById(post, req.user.id, id)
    res.redirect('/')
})

app.post('/deletePost/:id', checkAuthenticated, (req, res) => {
    const id = +req.params.id
    deletePost(id)
    res.redirect('/')
})

app.get('/newComment/:id', checkAuthenticated, (req, res) => {
    const id = +req.params.id
    const post = getPostById(id)
    const comments = getCommentsByPostId(id)
    res.render('newComment.ejs')
})

app.post('/newComment/:id', checkAuthenticated, (req,res) => {
    const id = +req.params.id
    newComment(req.body.comment, id, req.user.id)
    res.redirect(`/newComment/${id}`)
})
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get('/login',checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
        // store the user in the database
        newUser(req.body.name, req.body.email, hashedPassword )
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

// incase user tries to visit /login when they are already authenticated
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})