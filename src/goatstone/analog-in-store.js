'use strict'
const Rx = require('rx')
var mraa = require('./board/mock/mraa')
var AIO_DB = require('./db/aio')

var M2X = require('./com/post-m2x')
var light = new mraa.Aio( 1 )
var temp = new mraa.Aio( 2 )
var sound = new mraa.Aio( 3 )
var storeSensorDataInterval = 1000
var aioDB = new AIO_DB()
var m2x = new M2X()
//aioDB.create()

Rx.Observable.interval(5000)
    .subscribe(function () {
        getSendSensorData()
    })
Rx.Observable.interval(storeSensorDataInterval)
    .subscribe(function () {
        aioDB.getAll()
        aioDB.insertLight(light.read())
        aioDB.insertSound(sound.read())
        aioDB.insertTemperature(temp.read())
    })

function getSendSensorData(){
    var ps = []
    var lightData, soundData, temperatureData
    ps.push(
        aioDB.getLight().then(function(x){
            lightData = x
        }),
        aioDB.getSound().then(function(x){
            soundData = x
        }),
        aioDB.getTemperature().then(function(x){
            temperatureData = x
        })
    )
    Promise.all(ps).then(function(x) {
        m2x.postAll(lightData, soundData, temperatureData)
    });
}
