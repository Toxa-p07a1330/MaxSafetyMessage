const express = require('express')
const {getQueryParams} = require("./utils/getQueryParams");
const app = express()
const port = 3000
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../../database/messages.db');


let locked = false;
app.get('/message', (req, res) => {
    if (locked) {
        res.status(504)
        res.send("Try again  later");
        return;
    }
    locked = true;
    setTimeout(()=>{
        locked = false;
    }, 1000)
    const hash = getQueryParams(req.originalUrl).hash;
    try {
        db.get(`SELECT * FROM messages WHERE hash='${hash}'`, (err, row) => {
            if (row) {
                successHandler(res, row)
            } else {
                failureHandler(res, err)
            }
        });
    } catch (e) {
        console.log(e)
        res.sendStatus(404);
    }
})

const successHandler = (res, result) => {
    const message = result.message
    res.send(message)
}

const failureHandler = (res, error) => {
    res.status(500);
    res.send("Something went wrong")
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})