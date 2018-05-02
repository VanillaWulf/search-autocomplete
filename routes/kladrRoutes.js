const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
//var kladr = require('../kladr.json');

/* GET kladr page. */

router.get('/', function(req, res) {
  res.json({ title: 'hello' });
});

router.get('/app', function(req, res) {
  res.json({ title: 'app' });
});

router.get('/kladr', function(req, res) {
  res.json({ title: 'kladr' });
});

router.get('/users', function(req, res) {
  res.json({ title: 'users' });
});

module.exports = router;
