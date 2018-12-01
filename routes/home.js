

var express = require('express');
var router = express.Router();

//module.exports = function (app){
  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('home', { title: 'Auth0 Webapp Nodejs' });
  });
  module.exports = router;
//}

