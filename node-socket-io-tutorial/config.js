/*
 * node app configuration
 */

var config = {};
config.db = {};
config.general = {}; // added

config.db.type = 'mysql';
config.db.charset = 'utf8';
 
config.db.username = 'user';
config.db.password = 'pass';
config.db.host = 'localhost';
config.db.dbname = 'node_tests'; // DB name

config.db.comments_tbl = 'comments';

// added
config.general.host = '//localhost'; // http://my.host.com etc
config.general.port = 1337;
config.general.debug = false; // debug mode on/off

// export
module.exports = config;
