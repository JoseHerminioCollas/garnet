var https = require('https')

var h = 'api-m2x.att.com'
var p = '/v2/devices/20e971a5aae0e7aeeec434356221fcf1/updates/'
var options2 = {
    hostname: h,
    port: 443,
    path: p,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-M2X-KEY' : '3ef381bb98c492d4a6b21c363eb236d1'
    }
}
function callM2X(lightLevels){
    var pack = {"values":{
        "light": lightLevels
    }}
    var jsonP = JSON.stringify(pack)
    var req = https.request(options2, function(res) {
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