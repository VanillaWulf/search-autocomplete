const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const cors = require('cors');
const logger = require('morgan');
//const knex = require('./db/knex');
//var kladrJson = require('./kladr.json');

const kladr = require('./routes/kladrRoutes');
const index = require('./routes/indexRoutes');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

//app.use('/', index);

app.use('/kladr', kladr);
app.use('/', express.static(__dirname + '/public-cra/build/'));

app.listen(port, function() {
  console.log("listening on port: ", port);
})

