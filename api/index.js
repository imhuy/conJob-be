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


app.get('/', async function (req, res) {
    let r = await axios.post(`${url}${process.env.BOT_TOKEN}/sendMessage`,
        {
            chat_id: process.env.CHAT_ID,
            text: `<b> NewData</b> `,
            parse_mode: 'HTML',
        })
    res.send(`Welcome to CRON server ${process.env.BOT_TOKEN}`);
});



app.post('/cronjob', async (req, res) => {
    let r = await axios.post(`${url}${process.env.BOT_TOKEN}/sendMessage`,
        {
            chat_id: process.env.CHAT_ID,
            text: `<b> NewData</b> `,
            parse_mode: 'HTML',
        })
    res.send(`Welcome to CRON server ${process.env.BOT_TOKEN}`);
 
});

app.listen(8000, () => console.log('Server ready on port 8000.'));

module.exports = app;
