
var id = chrome.contextMenus.create({
    "id":"add-memo",
    "title": "Add Memo",
    "contexts":["all"]
});

function connect(){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        var port = chrome.tabs.connect(tabs[0].id);
        console.log(port);
        port.postMessage({ connect:"true" });
        port.onMessage.addListener((response) => {
            if(response.result==="success"){
                console.log("success");
            }
        });
    });
}

chrome.contextMenus.onClicked.addListener(function(info) {
    if (info.menuItemId == "add-memo") {
        connect();
    }
});