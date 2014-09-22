// YOUR CODE HERE:
  var app = {
    init: function() {
      app.handleSubmit();
    },
    send: function(message) {
      $.ajax({
        type: 'POST',
        url: 'localhost',
        data: JSON.stringify(message),
        success: function(message) {},
        // dataType: jsonp
      });
    },
    fetch: function() {
      $.ajax({});
    },
    clearMessages: function() {
      $('#chats').empty();
    },
    addMessage: function(message) {
      $('#chats').append("<p><span class='username'>"+message.username
        +": </span>"+message.text+"</p>");
      // this.send(message);
      $('.username').click(function() {
        // console.log('clicked');
        app.addFriend();
      });
    },
    addRoom: function(room) {
      $('#roomSelect').append("<span>"+room+"</span>");
    },
    addFriend: function() {
    },
    handleSubmit: function() {
      $('#send').click(function() {
        console.log("submitted");
        var inputMessage = document.getElementById('inputField');
        app.addMessage({username: 'peter', text: inputMessage.value});
        inputMessage = '';
      });
    }
  };

var test = function(){
  console.log("test");
}

$(document).ready(function() {
  app.init();
})




// var message = 'THIS IS WRONG!';
