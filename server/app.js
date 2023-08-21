const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const debug = require('debug')('server:server');
const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app= express();

const port = process.env.PORT ||3000;
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

mongoose.connect(process.env.MONGODB_URL).then(() => {
  server.listen(port);
  
  console.log(`mongodb connected & port is running on ${process.env.port}`)
}).catch(err => {
  console.log(err);
  process.exit(1);
});


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', require('./src/v1/routes'));

module.exports = app;
