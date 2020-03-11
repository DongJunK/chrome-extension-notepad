'use strict';


console.log("start");

// connect memo_script.js
function connect(){
    console.log("aaaaa");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        var port = chrome.tabs.connect(tabs[0].id);
        console.log("connect");
        var font_size = document.getElementById("select_font_size");
        console.log(font_size);
        var font_family = document.getElementById("select_font_family");
        var font_color = document.getElementById("select_font_color");
        port.postMessage({ connect:"popup", fontSize:font_size, font:font_family, color:font_color});
        port.onMessage.addListener((response) => {
            if(response.result==="success"){
                console.log("success");
            }
        });
    });
}

document.addEventListener('DOMContentLoaded',()=>{
    console.log("aaaaa");
    var ok_button = document.getElementById('ok_button');
    ok_button.addEventListener('click',connect);
});
