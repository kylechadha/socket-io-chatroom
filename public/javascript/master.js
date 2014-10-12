// Variables Definitions
var socket = io.connect();
console.log("connected!");


// Function Definitions
var addMessage = function(message, nick) {
  $('.chat__entries').append('<div class="message">' + nick + ': ' + message + '</div>')
}

var sendMessage = function() {
  if ($('.chat__controls__input').val() !== "") {
    socket.emit('message', $('.chat__controls__input').val());
    addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
    $('#messageInput').val('');
  }
}

var setNick = function() {
  if ($('.nick__input').val() !== "") {
    socket.emit('setNick', $('.nick__input').val());
    $('.chat__controls').show();
    $('.nick__input', 'nick__set').hide();
  }
}


// Socket.io Controls
socket.on('message', function(data) {
    addMessage(data['message'], data['nick']);
});


// Init Function
$(function() {
    $(".chat__controls").hide();
    $(".nick__set").click(function() {
      setNick();
    });
    $(".chat__controls__submit").click(function() {
      sendMessage();
    });
});