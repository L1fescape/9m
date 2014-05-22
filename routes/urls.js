var db = require('../db'),
  utf8 = require('utf8'),
  _ = require('lodash'),
  settings = require('../settings');

function findByKey(key, callback){
    db.collection(settings.mongo.coll, function(err, collection) {
        collection.findOne({'key': key}, function(err, item) {
          if (!err) {
            callback(item);
          }
          else {
            console.log(err);
            callback(null);
          }
        });
    });
}

exports.redirectUrl = function(req, res) {
  var key = req.params.key;
  findByKey(key, function(item){
    if (item){
      res.setHeader("cache-control", "no-cache, no-store, max-age=0, must-revalidate");
      res.setHeader("pragma", "no-cache");
      res.setHeader("location", "http://" + item.url);
      res.status(301);
      res.send(item);
    }
    else {
      res.send({'error':'Url not found'});
    }
  });
};

exports.showUrl = function(req, res) {
  var key = req.params.key;
  findByKey(key, function(item){
    if (item){
      res.send({url: item.url, key: item.key});
    }
    else {
      res.send({'error':'Url not found'});
    }
  });
};
 
exports.create = function(req, res) {
  var url = req.body.url;
  if (!url){
    res.send({'error': 'Please provide a url'}, 400);
    return;
  }
  var key = generateKey();
  db.collection(settings.mongo.coll, function(err, collection) {
    // todo check for duplicate key
    collection.insert({url: url, key: key}, {safe:true}, function(err, result) {
      if (err){
        console.log(err);
        res.send({'error':'An error has occurred'});
      }
      else {
        res.setHeader("cache-control", "no-cache, no-store, max-age=0, must-revalidate");
        res.setHeader("pragma", "no-cache");
        res.setHeader("location", "/show/" + result[0].key);
        res.status(301);
        res.send(result[0]);
      }
    });
  });
};

function generateKey(){
  var keyLength = 2,
    unicodeCharLength = 4,
    possible = "ABCDEF0123456789",
    key = "",
    text, i, j;

  for (i = 0; i < keyLength; i++){
    text = "";
    for (j = 0; j < unicodeCharLength; j++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    key += String.fromCharCode(parseInt(text, 16));
  }

  return key;
}
