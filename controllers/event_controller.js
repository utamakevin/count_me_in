const e = require('express')
const express = require('express')
const router = express.Router()
const db = require('./../db')
const ensureLoggedIn = require('./../middlewares/ensure_logged_in')

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM events;'

    db.query(sql, (err, dbRes) => {
        if(dbRes.rows.length === 0) {
            res.render('no_list_home')
        } else {
            res.render('home', { 
                events: dbRes.rows, 
                username: req.session.username 
            })
        }
    })
})

router.get('/event/new', ensureLoggedIn, (req, res) => {
    res.render('new_event', { userId: req.session.userId})
})

router.get('/event/:id', ensureLoggedIn, (req, res) => {
    const sql = `SELECT * FROM events WHERE id=${req.params.id}`
    db.query(sql, (dbReq, dbRes) => {
        res.render('event_details', { event: dbRes.rows[0], sessionId: req.session.userId })
    })
})


router.post('/event', (req, res) => {
    const sql = 'INSERT INTO events (title, description, image_url, user_id) VALUES ($1, $2, $3, $4);'

    console.log(req.body)
    
    db.query(sql, [req.body.title, req.body.description, req.body.image_url, req.session.userId], (req, dbRes) => {
        res.redirect('/')
    })
})




module.exports = router