var
  // expressjs
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),

  // http server
  http = require('http'),
  httpServer = http.createServer(app),

  // import routes
  urls = require('./routes/urls'),

  // import settings
  settings = require('./settings');

// parse application/json and application/x-www-form-urlencoded
app.use(bodyParser());
// serve static files
app.use(express.static(__dirname + "/static"));

// options for all routes
app.options("*", function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.end();
});

// API Routes
app.get('/:key', urls.redirectUrl);
app.get('/show/:key', urls.showUrl);
app.post('/create', urls.create);

// run http server
httpServer.listen(settings.web.port, settings.web.host);
console.log('Listening on', settings.web.host + ':' + settings.web.port);
