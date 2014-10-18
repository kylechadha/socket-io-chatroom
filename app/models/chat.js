var mongoose = require('mongoose');


// Schema
// ----------------------------------------------

var chatSchema = mongoose.Schema({

  local : {
    message : String
  }

});

module.exports = mongoose.model('Chat', chatSchema);
