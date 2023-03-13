const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use('view engine', 'ejs')










app.listen(port, () => {
    console.log(`listening on port ${port}`)
})