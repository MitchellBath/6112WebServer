// Importing http core package/module provided by nodejs
const { table } = require('console');
var http = require('http');

const host = 'localhost';
const port = 8000;
var data = [];

// MySQL Setup
var mysql = require('mysql2');
const { CLIENT_RENEG_WINDOW } = require('tls');
var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "pass",
    database: "sampledatabase"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

con.query('SELECT * FROM sampletable', (err, rows) => {
    if(err) throw err;
    rows.forEach((row) => {
        data.push(row)
    })
})

const requestListener = function (req, res) {
    res.writeHead(200);
    //res.end("Howdy");
    data.forEach((row) => {
        res.write(row.firstname.toString() + ' ' + row.lastname.toString() + '\n');
        console.log(row.firstname.toString() + ' ' + row.lastname.toString() + '\n');
    })
    res.end();
};

// Creating a server
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});