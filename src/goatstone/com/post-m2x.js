var https = require('https')

function M2X(){
    this.packet = {}
    this.config = require('./config')
}
M2X.prototype.postLight = function(lightLevels){
    this.packet = {"values":{
        "light": lightLevels
    }}
    this.post()
}
M2X.prototype.postAll = function(light, sound, temperature){
    this.packet = {"values":{
        "light": light,
        "sound": sound,
        "temperature": temperature
    }}
    this.post()
}
M2X.prototype.post = function(){
    var req = https.request(this.config, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            console.log('BODY:`', chunk);
        });
        res.on('end', function() {
        })
    })
    req.on('error', function(e) {
        console.log('problem', e);
    });
    req.write(JSON.stringify(this.packet))
    req.end()
}

module.exports = M2X