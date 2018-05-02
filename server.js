const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const cors = require('cors');
const logger = require('morgan');
const knex = require('./db/knex');

const kladr = require('./routes/kladrRoutes');
const index = require('./routes/indexRoutes');

//const index = require('./routes/indexRoutes');
//const todos = require('./routes/todosRoutes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//для статичного html
//app.use(express.static(__dirname + '/public-static-html'));

//для react-app
app.use(express.static(__dirname + '/public-cra/build/'));

app.get('api/hello',function(req,res){
  res.json({message:'hello'});
})

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index)
app.use('/kladr', kladr);

//app.use('/', index);
//app.use('/todos', todos);

app.listen(port, function() {
  console.log("listening on port: ", port);
})

