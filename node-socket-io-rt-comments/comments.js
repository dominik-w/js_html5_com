/*
 * node.js and socket.io - real-time, simple comments feature
 * (c) http://javascript-html5-tutorial.com/
 */

var http = require('http'),
        fs = require('fs'),
        index = "<html><body>Listening</body></html>";

// setup
var config = require('./config.js');
var tools = require('./tools.js');

var PORT = config.general.port;
var HOST = config.general.host;

// DB connection
var mysql = require('mysql');

var db_access = {
    host: config.db.host,
    user: config.db.username,
    password: config.db.password,
    database: config.db.dbname
};

var tbl_comments = config.db.comments_tbl;

// send html content to all requests
var app = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket) {
    socket.nick = '';
    socket.comment = '';
    socket.article_id = 0;

    socket.on('send', function (data) {

        data.c_data.comment = tools.sanitize(data.c_data.comment);

        socket.nick = data.c_data.nick;
        socket.comment = data.c_data.comment;
        socket.article_id = data.c_data.article_id;

        if (config.general.debug) {
            console.log('New comment to article: ' + socket.article_id);
        }

        // insert data to DB and emit back to all connected sockets
        insertComment(socket, data.c_data);
    });

    socket.on('disconnect', function () {
        console.log('User disconnected');
    });

});

function insertComment(socket, c_data) {
    
    var connection = mysql.createConnection(db_access);
    connection.connect();

    var clean_comment = tools.addslashes(socket.comment);

    var q = "INSERT INTO " + tbl_comments + " (article_id, sender, body, created_at) ";
    q += "VALUES (" + socket.article_id + ", '" + socket.nick + "', '" + clean_comment + "', NOW() )";
    // console.log(q);
    
    connection.query(q, function (qe, qr) {
        if (qe && config.general.debug) { console.log(qe); }

        // add to array the last insert ID (new comment ID)
        c_data.comment_id = qr.insertId;
        c_data.time = tools.getNow();

        // io.sockets = emit to all
        io.sockets.emit("add_comment", {
            comment_data: c_data
        });

        connection.end();
    });
}

app.listen(PORT);

console.log('Server running at ' + HOST + ':' + PORT + '/');
