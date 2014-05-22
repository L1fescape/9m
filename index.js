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

// configure express
// parse application/json and application/x-www-form-urlencoded
app.use(bodyParser())
// static pages and content. app dir is in a parent level directory, so we need
// to reference that
var dir = __dirname.split("/");
dir.pop();
app.use(express.static(dir.join("/") + "/dist"));

// options for all routes
app.options("*", function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, sessionID');
    res.end();
});

// API Routes
app.get('/:key', urls.findByKey);
app.post('/create', urls.create);

// run http server
httpServer.listen(settings.web.port);
console.log('Listening on', settings.web.port);
