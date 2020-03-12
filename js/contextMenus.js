//Add mouse right menu


chrome.contextMenus.create({
    "id":"add-memo",
    "title": "Add Memo",
    "contexts":["all"]
});

// right menu location
var gPos;

// gPos add right menu location 
chrome.extension.onMessage.addListener((msg)=> {
    if (msg.from == 'mouseup') {
        //storing position
        gPos = msg.point;
    }
});

// connect memo_script.js
function connect(){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        var port = chrome.tabs.connect(tabs[0].id);
        port.postMessage({ connect:"context_menus",gPos:gPos});
        port.onMessage.addListener((response) => {
            if(response.result==="success"){
                console.log("success");
            }
        });
    });
}

// right menu event listener
chrome.contextMenus.onClicked.addListener((info)=>{
    if (info.menuItemId == "add-memo") {
        connect();
    }
});