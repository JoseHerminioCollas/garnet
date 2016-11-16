window.onload = function(){
  var socket = io();
  socket.on('tick', function (data) {
    var el = document.querySelector('.msg')
    el.innerHTML = ':' + data.message
    console.log( 'data: ', data  );
  });

  var playB = document.querySelector('.play')
  playB.onclick = function(){
    socket.emit('play', {control:'play'});
  }
  var stopB = document.querySelector('.stop')
  stopB.onclick = function(){
    socket.emit('stop', {control:'stop'});
  }  
}
