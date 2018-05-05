//delete

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
var kladr = require('../kladr.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(express.static(__dirname + '/public-cra/build/'));
});

/*router.get('/kladr', function(req, res, next) {
  res.json(kladr);
});*/

module.exports = router;
