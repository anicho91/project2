const db = require('../models');

module.exports = function(app) {


      app.post('/api/signup', function(req, res) {
        db.UserEmail.create(req.body).then(function(UserEmail) {
          res.json(UserEmail);
        }).catch(function(error) {
          res.json({ error: error });
        });
      });

      app.get('/api/signup', function(req, res) {
        db.UserEmail.findAll({})
        .then(function(UserEmail) {
          res.json(UserEmail);
        }).catch(function(error) {
          res.json({ error: error });
        });
      });
  

}  