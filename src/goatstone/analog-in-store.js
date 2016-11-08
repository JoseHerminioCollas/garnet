'use strict'
var Rx = require('rx')
var mraa = require('./board/mock/mraa')
var Promise = require("bluebird");
var AIO_DB = require('./db/aio')
var M2X = require('./com/post-m2x')

var aioDB, m2x, light ,temp, sound, storeSensorDataInterval,
    lightData, soundData, temperatureData, tasks

aioDB = new AIO_DB()
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
        Promise.all(tasks).then(function(x) {
            m2x.postAll(lightData, soundData, temperatureData)
        });
    })
Rx.Observable.interval(storeSensorDataInterval)
    .subscribe(function () {
        aioDB.getAll()
        aioDB.insertLight(light.read())
        aioDB.insertSound(sound.read())
        aioDB.insertTemperature(temp.read())
    })