const express = require('express')
const {getQueryParams} = require("./utils/getQueryParams");
const {bruteforceProtection} = require("./utils/bruteforceProtection");
const {createHash} = require("./utils/createHash");
const app = express()
app.use(express.json())
const port = 3000
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../../database/messages.db');


app.get('/message', (req, res) => {
    const protection = bruteforceProtection(res);
    if (protection === -1)
        return
    const hash = getQueryParams(req.originalUrl).hash;
    try {
        db.get(`SELECT * FROM messages WHERE hash='${hash}'`, (err, row) => {
            if (row) {
                getSuccessHandler(res, row)
            } else {
                failureHandler(res, err)
            }
        });
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
})

app.post('/message', (req, res) => {

    const message = req.body.message;
    const hash = createHash(req.body.message)
    try {
        db.get(`INSERT INTO messages (message, hash) VALUES (message, hash);'`, (err, row) => {
            if (row) {
                postSuccessHandler(res, row)
            } else {
                failureHandler(res, err)
            }
        });
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }

})

const getSuccessHandler = (res, result) => {
    const message = result.message
    res.send(message)
}

const postSuccessHandler = (res, result) => {
    const message = result.message
    res.send(message)
}


const failureHandler = (res, error) => {
    res.status(500);
    console.log(error)
    res.send("Something went wrong")
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})