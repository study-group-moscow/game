const express = require('express')

const PORT = process.env.PORT || 8989

const app = express()

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(PORT, () => {
    console.log(`app run on port ${PORT}`)
})
