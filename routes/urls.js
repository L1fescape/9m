var db = require('../db'),
  url = require('url'),
  settings = require('../settings');
 
exports.findById = function(req, res) {
    var id = req.params.id;
    db.collection(settings.mongo.coll, function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findByKey = function(req, res) {
    var key = req.params.key;
    db.collection(settings.mongo.coll, function(err, collection) {
        collection.findOne({'key': key}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection(settings.mongo.coll, function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.create = function(req, res) {
    var link = req.body.url;
    if (!link){
      res.send({'error': 'Please provide a url'}, 400);
      return;
    }
    db.collection(settings.mongo.coll, function(err, collection) {
      collection.insert(song, {safe:true}, function(err, result) {
        if (err){
          console.log(err);
          res.send({'error':'An error has occurred'});
        }
        else {
          res.send(result[0]);
        }
      });
    });
};
