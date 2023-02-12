const express = require('express')
const {getQueryParams} = require("./utils/getQueryParams");
const {bruteforceProtection} = require("./utils/bruteforceProtection");
const {createHash} = require("./utils/createHash");
const app = express()
app.use(express.json())
const port = 3001
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../../database/messages.db');

const cors = require('cors');
app.use(cors({
    origin: '*'
}));
const SqlString = require('sqlstring');



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

    const messageRaw = req.body.message;
    const message64 = new Buffer(messageRaw).toString('base64');

    const hash = createHash(message64)
	console.log(message64)
    try {
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
    db.run(`INSERT INTO messages (id, messages,hash)VALUES( ${new Date().getTime()}, '${message64}', '${hash}');`, (err, row) => {

        if (!err) {
            postSuccessHandler(res, hash)
        } else {
            failureHandler(res, err)
        }
    });

})

const getSuccessHandler = (res, result) => {
    const message64 = result.messages;
    const buff = Buffer.from(message64, 'base64');
    const messageUTF16 = buff.toString('utf16le');

    console.log(messageUTF16)
	const responce = {
		success: true,
		payload: {
			message: messageUTF16
		}
	}
    res.send(JSON.stringify(responce))
}

const postSuccessHandler = (res, hash) => {
    const message = {
        success: true,
        payload: {
			hash: hash
		}
    }
    console.log(message)
    res.send(JSON.stringify(message))
}


const failureHandler = (res, error) => {
    res.status(500);
    console.log(error)
    res.send(JSON.stringify(
        {error: "Something went wrong"}
    ))
}

app.listen(port, () => {
    console.log(`Started`)
})