'use strict';


function colorToRgb(fontColor){
    switch(fontColor){
        case 'red':
            fontColor = "#FF0000";
            break;
        case 'blue':
            fontColor = "#00498c";
            break;
        case 'black':
            fontColor = "#000000";
            break;
        case 'green':
            fontColor = "#008000";
            break;
        case 'FAB201':
            fontColor = "#FAD201";
            break;
    }
    return fontColor;
}

// connect memo_script.js
function connect(){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        var port = chrome.tabs.connect(tabs[0].id);
        var select_font_size = document.getElementById("select_font_size");
        var select_font_family = document.getElementById("select_font_family");
        var select_font_color = document.getElementById("select_font_color");
        var fontSize = select_font_size.options[select_font_size.selectedIndex].value;
        var fontFamily = select_font_family.options[select_font_family.selectedIndex].value;
        var fontColor = select_font_color.options[select_font_color.selectedIndex].value;
        
        fontColor = colorToRgb(fontColor);
        
        port.postMessage({ connect:"popup", fontSize:fontSize, fontFamily:fontFamily, fontColor:fontColor});
        port.onMessage.addListener((response) => {
            alert(response.result);
            if(response.result==="success"){
                console.log("success");
            }
        });
    });
    window.close();
}



document.addEventListener('DOMContentLoaded',function(){
    var ok_button = document.getElementById('ok_button');
    ok_button.addEventListener('click',connect);
    
});