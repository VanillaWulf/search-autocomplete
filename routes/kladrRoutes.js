const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
//var kladr = require('../kladr.json');

/* GET kladr page. */

router.get('/', function(req, res) {
  res.json({ title: 'hello' });
});

module.exports = router;
