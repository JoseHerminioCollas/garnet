var Rx = require('rx')
var mraa = require('./board/mock/mraa')
var Promise = require("bluebird");
var AIO_DB = require('./db/aio')
var M2X = require('goatstone/com/m2x')
var sqlite3 = require('sqlite3').verbose();

var aioDB, m2x, light ,temp, sound, storeSensorDataInterval,
    lightData, soundData, temperatureData, tasks

aioDB = new AIO_DB(new sqlite3.Database(AIO_DB.dbName))
m2x = new M2X()
light = new mraa.Aio( 2 )
temp = new mraa.Aio( 0 )
sound = new mraa.Aio( 1 )
storeSensorDataInterval = 1000
Rx.Observable.interval(5000)
    .subscribe(function () {
        tasks = [
            aioDB.getLight().then(function(x){
                lightData = x
            }),
            aioDB.getSound().then(function(x){
                soundData = x
            }),
            aioDB.getTemperature().then(function(x){
                temperatureData = x
            })
        ]
        Promise.all(tasks).then(function() {
            m2x.postAll(lightData, soundData, temperatureData)
            .then(function(x){
                    console.log('post', x)
                })
        });
    })
Rx.Observable.interval(storeSensorDataInterval)
    .subscribe(function () {
        aioDB.getAll()
        aioDB.insertLight(light.read())
        aioDB.insertSound(sound.read())
        aioDB.insertTemperature(temp.read())
    })