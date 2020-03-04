$(document).ready(() => {
    let $chat = $("#chat");
    let $name = $("#name");
    let $chatBox = $("#chat-box");
    let $chatContent = $("#chat-content");
    let $text = $("#text");
    let ws;

    $chat.change(e => {
        if (ws) {
            ws.close();
            ws = null;
            $chatBox.remove();
        }
        
        ws = new WebSocket($chat.val()),
    
        ws.onmessage = message => {
            let msg = JSON.parse(message.data);
            let htmlMessage = 
            `<div class="message alert alert-light ${msg.name == $name.val() ? "message-right" : "message-left"}">
                <div class="username">${msg.name}</div>
                <div class="usertext">${msg.text}</div>
            </div>`;

            $chatContent.append(htmlMessage);
            $chatBox.scrollTop($chatContent.height());
        };
    
        ws.onopen = () => {
            $text.keyup(e => {
                if (e.which === 13 && $name.val() && $text.val()) {
                    let msg = {
                        name: $name.val(),
                        text: $text.val(),
                    }
                    ws.send(JSON.stringify(msg));
                    $text.val("");
                }
            });
        };
    });

    $chat.find('option')[0].value = window.location.origin.replace(/^https?/, 'ws');
    $chat.trigger("change");
});