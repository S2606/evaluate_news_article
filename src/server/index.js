const express = require('express');

const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const controller = require('./controller');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8081;

/* Middleware*/
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

app.post('/analyze', controller.analyzeURL);

// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
    if (error) throw new Error(error);
    console.log(`Analyzer app listening on port ${PORT}!`)
})

module.exports = app;