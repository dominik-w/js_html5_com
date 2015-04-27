/*
 * node.js and socket.io tests
 */

var http = require('http'),
    fs = require('fs'),
    index = fs.readFileSync(__dirname + '/index.html');

// setup
var config = require('./config.js');
var PORT = config.general.port;
var HOST = config.general.host;

// send html content to all requests
var app = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// socket.io server is listening ...
var io = require('socket.io').listen(app);

// sample function:
// send current time to all connected clients
function sendTime() {
    io.sockets.emit('time', {
        time: new Date().toJSON()
    });
}

// send current time every 10 secs
setInterval(sendTime, 10000);

// emit welcome message on connection
io.sockets.on('connection', function (socket) {
    socket.user_id = 0; // current user ID

    socket.emit('welcome', {message: 'Welcome!'});

    socket.on('sayhi', console.log); // just log data in console

    // process the data
    socket.on('user_online_data', function (data) {
        socket.user_id = data.mydata.id; // "socket scope"

        var name = data.mydata.name; // local scope
        console.log("User #:" + socket.user_id + ", name: " + name);
    });
});

app.listen(PORT);

console.log('Server running at ' + HOST + ':' + PORT + '/');
// console.log('Debug: ' + config.main.debug);
