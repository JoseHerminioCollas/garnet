var https = require('https')
var config = require('./config')

function callM2X(lightLevels){
    var pack = {"values":{
        "light": lightLevels
    }}
    var jsonP = JSON.stringify(pack)
    var req = https.request(config, function(res) {
        console.log('STATUS: ${res.statusCode}', res.statusCode );
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            console.log('BODY: ${chunk}`', chunk);
        });
        res.on('end', function() {
            console.log('No more data in response.')
        })
    })
    req.on('error', function(e) {
        console.log('problem}', e);
    });
    req.write(jsonP)
    req.end()
}
module.exports = callM2X