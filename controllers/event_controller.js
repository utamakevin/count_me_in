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
            res.locals.userId = req.session.userId
            res.render('home', { 
                events: dbRes.rows,
                username: req.session.username
            })
        }
    })
})

router.get('/about', (req, res) => {
    res.render('about')
})

router.get('/contact_us', (req, res) => {
    res.render('contact_us')
})

router.get('/password-reset', (req, res) => {
    res.send('lol jk')
})

router.get('/event/new', ensureLoggedIn, (req, res) => {
    res.render('new_event', { userId: req.session.userId, username: req.session.username})
})

router.get('/event/:id', ensureLoggedIn, (req, res) => {
    const sql = `SELECT * FROM events WHERE id=$1`
    db.query(sql, [req.params.id], (dbReq, dbRes) => {
        res.render('event_details', { event: dbRes.rows[0], sessionId: req.session.userId, username: req.session.username, numberJoined: dbRes.rows[0].number_joined })
    })
})

router.get('/event/edit/:id', ensureLoggedIn, (req, res) => {
    const sql = `SELECT * FROM events WHERE id=$1`
    db.query(sql, [req.params.id], (dbReq, dbRes) => {
        res.render('edit_event', { event: dbRes.rows[0], username: req.session.username })
    })
})

router.post('/event', ensureLoggedIn, (req, res) => {
    const sql = 'INSERT INTO events (title, description, image_url, user_id, number_joined) VALUES ($1, $2, $3, $4, $5);'
    
    db.query(sql, [req.body.title, req.body.description, req.body.image_url, req.session.userId, req.body.number_joined], (req, dbRes) => {
        res.redirect('/')
    })
})

router.post('/event/edit', ensureLoggedIn, (req, res) => {
    const sql = 'UPDATE events SET title = $1, description = $2, image_url = $3 WHERE id=$4;'
    
    db.query(sql, [req.body.title, req.body.description, req.body.image_url, req.body.id], (req, dbRes) => {
        res.redirect('/')
    })
})

// router.post('/count_in', ensureLoggedIn, (req, res) => {
//     const sql = 'SELECT * FROM events where id=$1;'
//     db.query(sql, [req.body.event_id], (db1Req, db1Res, next) => {
//         const numberJoined = Number(db1Res.rows[0].number_joined)
//         const numberJoinedAdded = numberJoined + 1

//         const sql2 = `UPDATE events SET number_joined=$1 WHERE id=$2;`
//         db.query(sql2, [numberJoinedAdded, req.body.event_id], (dbReq, dbRes) => {
//             db.query(`INSERT INTO agendas (user_id, event_id) VALUES ($1, $2);`, [req.body.user_id, req.body.event_id], (db3Req, db3Res) => {
//                 res.render('see_you_soon', {layout: 'login_layout'})
//             })
//         })
//     })
// })

router.post('/count_in', ensureLoggedIn, (req, res) => {
    db.query(`SELECT * FROM agendas WHERE event_id=$1;`, [req.body.event_id], (dbReq, dbRes) => {
        const numberJoined = Number(dbRes.rows.length)
        const numberJoinedAdded = numberJoined + 1
        db.query(`SELECT * from agendas WHERE event_id=$1 AND user_id=$2;`, [req.body.event_id, req.body.user_id], (db0Req, db0Res) => {
            if(db0Res.rows.length === 0) {
                db.query(`INSERT INTO agendas (user_id, event_id) VALUES ($1, $2);`, [req.body.user_id, req.body.event_id], (db1Req, db1Res) => {
                    db.query(`UPDATE events SET number_joined=$1 WHERE id=${req.body.event_id};`, [numberJoinedAdded], (db2Req, db2Res) => {
                        res.render('see_you_soon',  {layout: 'login_layout' })
                    })
                })
            } else {
                res.render('already_counted_in', { layout: 'login_layout' })
            }
        })
    })
})







router.delete('/event/:id', ensureLoggedIn, (req, res) => {
    console.log(req.params.id)
    const sql = 'DELETE FROM events WHERE id=$1;'

    db.query(sql, [req.params.id], (req, dbRes) => {
        res.render('event_deleted', { layout: 'login_layout' })
    })
})




module.exports = router