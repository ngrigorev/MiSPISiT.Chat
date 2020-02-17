let field = $("#field"),
    chat = $("#chat"),
    ws = new WebSocket("ws://localhost:591");
    ws.onmessage = function(message){
        chat.val(message.data + "\n" + chat.val());        
     };

     ws.onopen = function() {
         field.keydown(function(event){
             if(event.which===13){
                ws.send(field.val());
                field.val("");
             }
         });
     };