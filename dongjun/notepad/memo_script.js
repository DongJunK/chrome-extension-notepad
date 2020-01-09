
chrome.runtime.onConnect.addListener((port)=> {
    console.log("connetion");
    // This will get called by the content script we execute in
    // the tab as a result of the user pressing the browser action.
    port.onMessage.addListener((request)=>{
        console.log("memo");
        if(request.connect === 'true'){
            console.log("success");
            port.postMessage({result:"success"});
        }
    });
});