const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
var kladrJson = require('../kladr.json');

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value){
  const escapedValue = escapeRegexCharacters(value.trim());
   if (escapedValue === '') {
     return [];
   }
   const regex = new RegExp('^' + escapedValue, 'i');
   let searchResult = kladrJson.filter(kladrJson => regex.test(kladrJson.City));
   return searchResult;
}

/* GET kladr page. */

router.get('/', function(req, res) {
   res.json(kladrJson);
});

router.get('/:value', function(req, res) {
  let value = req.params.value;
  var responseObject = getSuggestions(value);
  res.json(responseObject);
  console.log(responseObject);
});



module.exports = router;
