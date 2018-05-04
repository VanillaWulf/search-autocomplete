const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
var kladrJson = require('../kladr.json');

/* GET kladr page. */

router.get('/', function(req, res) {
   res.json(kladrJson);
 });

module.exports = router;
