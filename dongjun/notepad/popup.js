'use strict';

let addMemo = document.getElementById('addMemo');

addMemo.onclick = function(element) {
    console.log("here");
    var iframe = document.createElement('iframe'); 
    iframe.style.background = "green";
    iframe.style.height = "100%";
    iframe.style.width = "0px";
    iframe.style.position = "fixed";
    iframe.style.top = "0px";
    iframe.style.right = "0px";
    iframe.style.zIndex = "9000000000000000000";
    iframe.frameBorder = "none"; 
    iframe.src = chrome.extension.getURL("popup.html");
    document.body.appendChild(iframe);
};
