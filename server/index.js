const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const cors = require('cors');

const app = express();
const path = require('path');
const config = require('../config.js');

const PUBLIC_DIR = path.resolve(__dirname, 'client', 'dist');

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(PUBLIC_DIR));
app.use(express.json());

const PORT = 3000;

app.use('/*', (req, res) => {
  const { body, method, originalUrl } = req;

  const axiosConfig = {
    method,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax${originalUrl}`,
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
  console.log('App is listening on http://localhost:3000');
});
