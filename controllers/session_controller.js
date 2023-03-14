const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const db = require('./../db')

router.get('/login', (req, res) => {
    res.render('login', { layout: 'login_layout' })
})

router.get('/signup', (req, res) => {
    res.render('signup', { layout: 'login_layout' })
})

router.post('/signup/new', (req, res) => {
    const sql = `SELECT * FROM users WHERE username = $1;`

    db.query(sql, [req.body.username], (err, dbRes) => {
        // console.log(dbRes.rows)
        if(dbRes.rows.length === 0) {
            const username = req.body.username
            const plainTextPassword = req.body.password

            bcrypt.genSalt(10, (err, salt) => {

                bcrypt.hash(plainTextPassword, salt, (err, digestedPassword) => {
                    const sql = `INSERT INTO users (username, password_digest) VALUES ($1, $2);`
        
                    db.query(sql, [username, digestedPassword], (err, dbRes) => {
                        res.redirect('/login')
                    })
                })
            })

        } else {
            res.render('username_found')
        }
    })
})

router.post('/sessions', (req, res) => {
    const { username, password } = req.body

    const sql = `SELECT * FROM users WHERE username = '${username}';`

    db.query(sql, (err, dbRes) => {
        if(dbRes.rows.length === 0) {
            // res.render('login') // redirect to wrong cred
            res.render('wrong_cred', { layout: 'login_layout' })
            return  
        } 

        const user = dbRes.rows[0]

        bcrypt.compare(password, user.password_digest, (err, result) => {
            if(result) {
                req.session.userId = user.id
                req.session.username = user.username
                res.redirect('/')
            } else {
                // res.render('login') // redirect to wrong cred
                res.render('wrong_cred', { layout: 'login_layout' })
            }
        })
    })
})

router.delete('/sessions', (req, res) => {
    req.session.destroy(() => { 
        res.redirect('/')
    })
})




module.exports = router