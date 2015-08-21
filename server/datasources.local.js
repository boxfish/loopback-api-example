var extend = require('util')._extend;

// Use the memory connector by default.
var DB = process.env.DB || 'memory';

var DATASTORES = {
  memory: {
  },
  mongodb: {
    host: 'localhost',
    database: 'we-housing',
    port: 27017,
    //username: '',
    //password: ''
  },
  mysql: {
    host: 'localhost',
    port: 3306,
    database: 'we-housing',
    //username: '',
    //password: ''
  }
};

if (!(DB in DATASTORES)) {
  console.error('Invalid DB "%s"', DB);
  console.error('Supported values', Object.keys(DATASTORES).join(' '));
  process.exit(1);
}

console.error('Using the %s connector.', DB);
console.error('To specify another connector:');
console.error('  `DB=mongodb node .` or `DB=mongodb slc run .`');
console.error('  `DB=mysql node .` or `DB=mysql slc run .`');

var connector = DB === 'memory' ? DB : 'loopback-connector-' + DB;
var config = extend({ connector: connector }, DATASTORES[DB]);

module.exports = {
  db: config
};
