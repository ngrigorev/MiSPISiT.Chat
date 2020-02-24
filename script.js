//lesson 1:
let text     = $("#text"),
    chat     = $("#chat"),
    chat_body= $("#chat_body"),
    name     = $("#name"),
    chatname = $("#chatname"), //lesson 3
    message  = $(".message"),
    ws;
    
//lesson 3 - begin 
chatname.change(function (event) {
    if (ws) {
        ws.close();
        ws = null;
        // message.remove();
    }
    //ws = new WebSocket("ws://192.168.1.44:591"); 
    ws = new WebSocket(chatname.val()),
//lesson 3 - end

    ws.onmessage = function (message_ws) {
        let message_in = JSON.parse(message_ws.data);
        let message_field = `<div class="message alert alert-light ${message_in.name == name.val() ? "message-right" : "message-left"}">
                                <div class="username">${message_in.name}</div>
                                <div class="usertext">${message_in.text}</div>
                            </div>`;
        chat.append(message_field);
        chat_body.scrollTop(chat.height());

    };

    ws.onopen = function () {
        text.keyup(function (event) {
            if (event.which === 13 && name.val() && text.val()) {
                let message_out = {
                    name: name.val(),
                    text: text.val(),
                }
                ws.send(JSON.stringify(message_out));
                text.val("");
            }
        });
    };
//lesson 3 begin
})
    //lesson 4 begin:
// chatname.find("option").toArray().forEach(element => {
//     let el = $(element),
//         loc_obj_synh = {isClose: false};
//         ws1 = new WebSocket(el.val());
//     ws1.onopen = function() {
//         ws1.send("TestConnect");
//         ws1.close();
//         console.log("onopen");
//         loc_obj_synh.isClose = true;
//     };
//     el.prop("style","color: green");
//     ws1.onerror = function(){
//         el.prop("style","color: red");
//         ws1.close();

//         console.log("onerror");
//         loc_obj_synh.isClose = true;
//     }
//     ws1.onclose = function() {
//         loc_obj_synh.isClose = true;
//         console.log("onclose");
//     }
//     while (!loc_obj_synh.isClose) {
//     }
// });
    //lesson 4 end:
chatname.trigger("change");
//lesson 3 end