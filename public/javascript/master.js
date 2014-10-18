
//
//
// ** NEXT UP!
// 1. Get it so that it displays the historic chats when you load ... although how long are these stored? Look into how that works
// --> Maybe ask michelle
//XX 2. Deploy to heroku!
// 3. Make it so the messages are sent on form submit rather than click so you can just press enter
// 4. Add some basic styles (padding above the messages / below the 'Getting into Realtime Web')

// Variables Definitions
var socket = io.connect();
console.log("connected!");


// Function Definitions
var addMessage = function(message, nick) {
  $('.chat__entries').append('<div class="message"><p>' + nick + ': ' + message + '</p></div>');
}

var sendMessage = function() {
  if ($('.chat__controls__input').val() != "") {
    socket.emit('message', $('.chat__controls__input').val());
    // I think here you would also send the message to a db

    addMessage($('.chat__controls__input').val(), "Me", new Date().toISOString(), true);
    $('.chat__controls__input').val('');
  }
}

var setNick = function() {
  if ($('.nick__input').val() != "") {
    socket.emit('setNick', $('.nick__input').val());
    $('.chat__controls').show();
    $('.nick__input').hide();
    $('.nick__set').hide();
  }
}


// Socket.io Controls
socket.on('message', function(data) {
  addMessage(data['message'], data['nick']);
});


// Init Function
$(function() {
    $(".chat__controls").hide();
    // And here you would load the last ~20 messages

    $(".nick__set").click(function() {
      setNick();
    });
    $(".chat__controls__submit").click(function() {
      sendMessage();
    });
});
