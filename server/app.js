const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const cors = require('cors');
const compression = require('compression');

const app = express();
const path = require('path');
const config = require('../config.js');

const PUBLIC_DIR = path.resolve(__dirname, '..', 'client', 'dist');
const BOOTSTRAPCSS_DIR = path.resolve(__dirname, '..', 'node_modules', 'bootstrap', 'dist', 'css');
const BOOTSTRAPJS_DIR = path.resolve(__dirname, '..', 'node_modules', 'bootstrap', 'dist', 'js');

app.use(compression());
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(PUBLIC_DIR));
app.use(express.json());

app.use('/css', express.static(path.join(BOOTSTRAPCSS_DIR)));
app.use('/js', express.static(path.join(BOOTSTRAPJS_DIR)));
app.use('/favicon.ico', express.static(path.join(__dirname)));

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

module.exports = app;
