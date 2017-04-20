var app = require('./server-config.js');

var port = process.env.PORT || 4568;

var ip = 162.243.44.239;


app.listen(port, ip);

console.log('Server now listening on port ' + port);
console.log('Server using ip ' + ip);

//