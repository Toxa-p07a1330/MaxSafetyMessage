const express = require('express')
const app = express()
const port = 3000

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database/messages.db');

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/all', (req, res) => {
    db.each("SELECT * FROM messages", (err, row) => {
        console.log(row);
        console.log(err)
    });
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})