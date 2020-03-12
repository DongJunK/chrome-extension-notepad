'use strict';

// monuse right button menu location listener
document.addEventListener('mouseup', function (mousePos) {
    if (mousePos.button === 2) {
        var p = {pageX: mousePos.pageX, pageY: mousePos.pageY};
        var msg = {text: 'example', point: p, from: 'mouseup'};
        chrome.runtime.sendMessage(msg);
    }
});

chrome.runtime.onConnect.addListener((port)=> {
    port.onMessage.addListener((request)=>{
        if(request.connect === 'context_menus'){
            document.body.innerHTML += "<div id=\"divpop\" style=\"position:absolute;left:"+request.gPos.pageX+"px;top:"+request.gPos.pageY+"px;z-index:200\"> <table width=300 height=400 cellpadding=2 cellspacing=0> <tr> <td style=\"border:1px #666666 solid\" height=360 align=center bgcolor=white> <p> Memo </p> <textarea id=\"memotext\" name=\"ourtext\" rows=\"17\" style=\"width:95%;height:85%;resize:none\"></textarea> </td> </tr> </table> </div>";
            document.getElementById("memotext").style.color = "#000000";
            document.getElementById("memotext").style.fontSize = "14px";
            port.postMessage({result:"success"});
        }else if(request.connect === 'popup'){
            document.getElementById("memotext").style.color = request.fontColor;
            document.getElementById("memotext").style.fontFamily = request.fontFamily;
            document.getElementById("memotext").style.fontSize = request.fontSize + "px";
            port.postMessage({result:"success"});
        }
    });
});