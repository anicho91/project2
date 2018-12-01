const path = require("path");
const cors = require("cors");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/chat", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/chat.html"));
  });

  app.get("/parking", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/parking.html"));
  });

  app.get("/weather", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/weather.html"));
  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/mailingList.html"));
  });

  app.get("/admin", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/admin.html"));
  });

   app.get("/logout", function(req, res) {
     res.sendFile("https://gtprojtwo.auth0.com/v2/logout");
   });
};
