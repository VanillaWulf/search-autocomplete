//delete

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
var kladrJson = require('../kladr.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(express.static(__dirname + '/public-cra/build/'));
});

router.get('/search/:value', function(req, res) {
  let value = req.params.value;
  var responseObject = {message: 'set '+value+' letter'};
  res.send(responseObject);
});

router.get('/kladr', function(req, res, next) {
  res.json(kladrJson);
});

module.exports = router;
