// YOUR CODE HERE:
  var app = {
    init: function() {
      app.handleSubmit();
      // test();
      app.fetch();
      app.mode = "TEST";
      // app.mode = "GO";
    },
    send: function(message) {
      // debugger;
      if(app.mode !== "TEST") {
        $.ajax({
          type: 'POST',
          url: 'https://api.parse.com/1/classes/chatterbox',
          data: JSON.stringify(message),
          contentType: 'application/jsonp',
          success: app.addMessage(message)
          // dataType: jsonp
        });
      } else {
        app.addMessage(message);
      }
    },
    fetch: function() {
      $('#main').empty;
      $.ajax({
        url: 'https://api.parse.com/1/classes/chatterbox',
        success: app.handleData,
        data: {'order': '-createdAt'}
      });
    },
    clearMessages: function() {
      $('#chats').empty();
    },
    addMessage: function(message) {
      var msg;
      if (app.Mode !== "TEST") {
        msg = removeTags(message.text);
        if (!msg) {
          return;
        }
      } else {
        msg = message.text;
      }
      $('#chats').append("<p><span class='username'>"+message.username
        +": </span>"+msg+"</p>");
      // this.send(message); s
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
        // console.log("submitted");
        var name = document.getElementById('nameField');
        var inputMessage = document.getElementById('inputField');
        var room = document.getElementById('roomField');
        app.send({
          username: name.value,
          text: inputMessage.value,
          room: room.value
        });
      });
    },
    handleData: function(data) {
      for (var i = data.results.length - 1; i >= 0; i--) {
        app.addMessage(data.results[i]);
      }
    }
  };

var test = function() { console.log('here'); };

var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';

var tagOrComment = new RegExp(
    '<(?:'
    // Comment body.
    + '!--(?:(?:-*[^->])*--+|-?)'
    // Special "raw text" elements whose content should be elided.
    + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
    + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
    // Regular name
    + '|/?[a-z]'
    + tagBody
    + ')>',
    'gi');
function removeTags(html) {
  var oldHtml;
  if (!html) { return; }
  do {
    oldHtml = html;
    html = html.replace(tagOrComment, '');
  } while (html !== oldHtml);
  return html.replace(/</g, '&lt;');
}


$(document).ready(function() {
  app.init();
})




// var message = 'THIS IS WRONG!';
