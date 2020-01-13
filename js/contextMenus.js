//Add mouse right menu
var id = chrome.contextMenus.create({
    "id":"add-memo",
    "title": "Add Memo",
    "contexts":["all"]
});

// right menu location
var gPos;

// gPos add right menu location 
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.from == 'mouseup') {
        //storing position
        gPos = msg.point;
    }
});

// connect memo_script.js
function connect(){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        var port = chrome.tabs.connect(tabs[0].id);
        console.log(gPos);
        port.postMessage({ connect:"true",gPos:gPos});
        port.onMessage.addListener((response) => {
            if(response.result==="true"){
                console.log("success");
            }
        });
    });
}

// right menu event listener
chrome.contextMenus.onClicked.addListener(function(info) {
    if (info.menuItemId == "add-memo") {
        connect();
    }
});