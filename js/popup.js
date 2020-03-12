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
        case 'yellow':
            fontColor = "#FAD201";
            break;
        case 'white':
            fontColor = "#FFFFFF";
            break;
    }
    return fontColor;
}

// connect memo_script.js
function connect(){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        var port = chrome.tabs.connect(tabs[0].id);
        var selectFontSize = document.getElementById("selectFontSize");
        var selectFontFamily = document.getElementById("selectFontFamily");
        var selectFontColor = document.getElementById("selectFontColor");
        var fontSize = selectFontSize.options[selectFontSize.selectedIndex].value;
        var fontFamily = selectFontFamily.options[selectFontFamily.selectedIndex].value;
        var fontColor = selectFontColor.options[selectFontColor.selectedIndex].value;
        var backgroundColor = selectBackgroundColor.options[selectBackgroundColor.selectedIndex].value;

        fontColor = colorToRgb(fontColor);
        backgroundColor = colorToRgb(backgroundColor);
        
        port.postMessage({ connect:"popup", fontSize:fontSize, fontFamily:fontFamily, fontColor:fontColor, backgroundColor:backgroundColor});
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
    var okButton = document.getElementById('okButton');
    okButton.addEventListener('click',connect);
    
});