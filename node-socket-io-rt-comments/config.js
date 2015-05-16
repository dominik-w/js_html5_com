/*
 * node app configuration
 * (c) http://javascript-html5-tutorial.com/
 */

var config = {};
config.db = {};
config.general = {};

config.db.type = 'mysql';
config.db.charset = 'utf8';
 
config.db.username = 'user';
config.db.password = 'pass';
config.db.host = 'localhost';
config.db.dbname = 'node_tests'; // DB name

config.db.comments_tbl = 'tbl_comments';

config.general.host = '//localhost'; // http://my.host.com etc
config.general.port = 1350;
config.general.debug = true; // debug mode on/off

// export
module.exports = config;
