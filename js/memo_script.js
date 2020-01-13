'use strict';

// monuse right button menu location listener
document.addEventListener('mouseup', function (mousePos) {
    if (mousePos.button == 2) {
        var p = {pageX: mousePos.pageX, pageY: mousePos.pageY};
        var msg = {text: 'example', point: p, from: 'mouseup'};
        chrome.runtime.sendMessage(msg, function(response) {});
    }
});

chrome.runtime.onConnect.addListener((port)=> {
    port.onMessage.addListener((request)=>{
        if(request.connect === 'true'){
            document.body.innerHTML += "<div id=\"divpop\" style=\"position:absolute;left:"+request.gPos.pageX+"px;top:"+request.gPos.pageY+"px;z-index:200\"> <table width=300 height=400 cellpadding=2 cellspacing=0> <tr> <td style=\"border:1px #666666 solid\" height=360 align=center bgcolor=white> <p> Memo </p> <textarea name=\"ourtext\" rows=\"17\" style=\"width:95%;height:85%;resize:none\"></textarea> </td> </tr> </table> </div>";
            //console.log(popup);
            port.postMessage({result:"success"});
            
        }
    });
});