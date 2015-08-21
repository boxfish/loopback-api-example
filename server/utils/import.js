/**
 * Run `node import.js` to import the sample data into the db.
 */

var async = require('async');

// sample data
var smapleDataDir = '../sample-data/';

var users = require(smapleDataDir + 'user.json');

module.exports = function(app, cb) {
  var User = app.models.user;
  var db = app.dataSources.db;

  var ids = {
  };

  function importData(Model, data, cb) {
    // console.log('Importing data for ' + Model.modelName);
    Model.destroyAll(function(err) {
      if (err) {
        cb(err);
        return;
      }
      async.each(data, function(d, callback) {
        Model.create(d, callback);
      }, cb);
    });
  }

  async.series([
    function(cb) {
      db.autoupdate(cb);
    },

    importData.bind(null, User, users)
  ], function(err/*, results*/) {
    cb(err);
  });
};

if (require.main === module)
  // The import runs automatically during the boot process.
  require('../server');
