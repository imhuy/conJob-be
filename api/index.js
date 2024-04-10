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

    res.json({
        BOT_TOKEN: process.env.BOT_TOKEN,
        CHAT_ID: process.env.CHAT_ID,
    });
});


const genMessage = async (data) => {


    let message = data.map((item) => {
        `Ip:` | `Country:2\n` | `City: 3\n` | `Region: 4\n` | `Status: User Resend Code\n`
    });

    return message;

}

async function logMessage() {

    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json, text/plain, */*");
    myHeaders.append("accept-language", "en-US,en;q=0.9");
    myHeaders.append("authorization", "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNNSVhJUEdOQzNPRUxTUURQTkxHREVKUkpMWjlQTUJZT1NWWUtUUE8iLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiIzYTA5YWYyNy0wYzdhLWJkMGItODUwMi0yYjlhMTY4YWQ3ZmYiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWJwLmlvIiwicm9sZSI6ImFkbWluIiwiZ2l2ZW5fbmFtZSI6ImFkbWluIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJlbWFpbF92ZXJpZmllZCI6IkZhbHNlIiwidW5pcXVlX25hbWUiOiJhZG1pbiIsIm9pX3Byc3QiOiJBbHBoYVF1ZXN0X0FwcCIsImNsaWVudF9pZCI6IkFscGhhUXVlc3RfQXBwIiwib2lfdGtuX2lkIjoiM2ExMTg2OWQtZjVhMC0zMDhlLWQzZjEtMzMyZDJkOTkzODUwIiwiYXVkIjoiQWxwaGFRdWVzdCIsInNjb3BlIjoiQWxwaGFRdWVzdCIsImp0aSI6IjlmOTVkMTViLTJiY2UtNGU1MC1iOWM2LWIzZmI1YzFiM2EyZiIsImV4cCI6MTcxMzk0MjU1NCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNjEvIiwiaWF0IjoxNzExMzUwNTU0fQ.Vgt3baWpZuDOr5yWRUkIdKz9dmOldMJrOx7JOZm4pklHIaCLaf85cDUaRRSWTZteX1L86UzKrcvF4WuGfP1jVWxbrQ_zzD0Af7OxItXOo4upG0Jw9S1KRrvIJpG4kvd51oaFf3BivF_FqBxprfjEapE1nlZb29lyNzvswUxOLlmreLCfz4wdJWqHxXshuu6mgQ7goqEK2iITqO9oQa6hjc8CynfippH7xMuSyHorZnc4-dQXEz9a2JeC2nYseNA9E97PH_2Sx6bT143lwL01g7kHxhYqqZcoETuy7oES90OJupmLGC87hAv4fvz-LVO4m6g9eVtAUAkAfKIJ179f6g");
    myHeaders.append("origin", "https://app.alphaquest.io");
    myHeaders.append("referer", "https://app.alphaquest.io/");
    myHeaders.append("sec-ch-ua", "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"");
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", "\"macOS\"");
    myHeaders.append("sec-fetch-dest", "empty");
    myHeaders.append("sec-fetch-mode", "cors");
    myHeaders.append("sec-fetch-site", "same-site");
    myHeaders.append("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    let data = await fetch("https://api.alphaquest.io/api/app/twitter?pageNumber=1&pageSize=20&sortBy=SCORE&timeFrame=1D&newest=false", requestOptions)
    let response = await data.json();

    let message = response.items.map((item) => {
        let data = `<pre><code class="language-${item.name}">${item.name}| Score:${item.score}| Trending Score:${item.trendingScore}| Followers Count:${item.followersCount}  </code></pre>\n`;
        return data;

    });
    console.log(message);
    console.log('lstName', typeof message);

    let r = await axios.post(`${url}${process.env.BOT_TOKEN}/sendMessage`,
        {
            chat_id: process.env.CHAT_ID,
            text: `<b> tôppopo</b>${message.join('')}`,
            parse_mode: 'HTML',
        })

}

cron.schedule('10 * * * * *', () => {

    logMessage();
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
