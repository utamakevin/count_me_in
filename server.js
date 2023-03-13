const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const methodOverride = require('./middlewares/method-override')
const setCurrentUser = require('./middlewares/set_current_user')
const viewHelpers = require('./middlewares/view_helpers')

const sessionController = require('./controllers/session_controller')
const eventController = require('./controllers/event_controller')




app.set('view engine', 'ejs')


app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride)
app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
}))
app.use(expressLayouts)

app.use(setCurrentUser)
app.use(viewHelpers)




app.use('/', sessionController)
app.use('/', eventController)





app.listen(port, () => {
    console.log(`listening on port ${port}`)
})