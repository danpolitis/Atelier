const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const cors = require('cors');

const app = express();
const path = require('path');
const config = require('../config.js');

const PUBLIC_DIR = path.resolve(__dirname, '..', 'client', 'dist');
const BOOTSTRAPCSS_DIR = path.resolve(__dirname, '..', 'node_modules', 'bootstrap', 'dist', 'css');
const BOOTSTRAPJS_DIR = path.resolve(__dirname, '..', 'node_modules', 'bootstrap', 'dist', 'js');

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(PUBLIC_DIR));
app.use(express.json());

const PORT = 3000;

app.use('/css', express.static(path.join(BOOTSTRAPCSS_DIR)));
app.use('/js', express.static(path.join(BOOTSTRAPJS_DIR)));

app.get('/test', (req, res) => {
  res.json({ message: 'pass!' });
});

app.use('/api/*', (req, res) => {
  const { body, method, originalUrl } = req;
  const axiosConfig = {
    method,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax${originalUrl.slice(4)}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': config.TOKEN,
    },
    data: body,
  };

  axios(axiosConfig)
    .then(({ data }) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});

module.exports = app;
