const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
var kladr = require('../kladr.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'This cool stuff' });
});

router.get('/kladr', function(req, res, next) {
  res.json(kladr);
 });

module.exports = router;
