

chrome.runtime.onConnect.addListener((port)=> {
    console.log("connetion");
    // This will get called by the content script we execute in
    // the tab as a result of the user pressing the browser action.
    port.onMessage.addListener((request)=>{
        console.log("memo");
        if(request.connect === 'true'){
            console.log("success1");
            document.body.innerHTML = "<div id=\"divpop\" style=\"position:absolute;left:395px;top:190px;z-index:200;visibility:hidden;\"> <table width=300 height=400 cellpadding=2 cellspacing=0> <tr> <td style=\"border:1px #666666 solid\" height=360 align=center bgcolor=white> <p> Memo </p> <textarea name=\"ourtext\" rows=\"17\" style=\"width:95%;height:85%;resize:none\"></textarea> </td> </tr> </table> </div> <script language=\"Javascript\"> cookiedata = document.cookie; document.all['divpop'].style.visibility = \"visible\"; </script>";
            port.postMessage({result:"success"});
        }
    });
});