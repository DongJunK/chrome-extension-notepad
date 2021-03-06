'use strict';

var count = 0;
var img_L = 0;
var img_T = 0;
var targetObj;

function getLeft(o){
    return parseInt(o.style.left.replace('px', ''));
}
function getTop(o){
    return parseInt(o.style.top.replace('px', ''));
}

// 이미지 움직이기
function moveDrag(e){
    var e_obj = window.event? window.event : e;
    var dmvx = parseInt(e_obj.clientX + img_L);
    var dmvy = parseInt(e_obj.clientY + img_T);
    targetObj.style.left = dmvx +"px";
    targetObj.style.top = dmvy +"px";
    return false;
}

// 드래그 시작
function startDrag(e, obj){
    var x = obj.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    targetObj = x;
    var e_obj = window.event? window.event : e;
    img_L = getLeft(x) - e_obj.clientX;
    img_T = getTop(x) - e_obj.clientY;

    document.onmousemove = moveDrag;
    document.onmouseup = stopDrag;
    if(e_obj.preventDefault)e_obj.preventDefault();
}

// 드래그 멈추기
function stopDrag(){
    document.onmousemove = null;
    document.onmouseup = null;
}

function addCss() {
    var css = "<style>";
    css += "#divpop {";
    css += "overflow: hidden;";
    css += "resize: both;";
    css += "min-width: 300px;";
    css += "min-height: 300px;";
    css += "max-width: 600px;";
    css += "max-height: 600px;";
    css += "position:absolute;";
    css += "z-index:200;";
    css += "} ";
    css += "#memotext {";
    css += "width:95%;";
    css += "height:80%;";
    css += "resize: none;";
    css += "} ";
    css += ".table {";
    css += "width:100%; ";
    css += "height:100%;";
    css += "border-spacing: 0px;";
    css += "} ";
    css += ".td {";
    css += "border:1px #666666 solid;";
    css += "text-align:center;";
    css += "background-color:white;";
    css += "} ";
    css += ".title {";
    css += "margin-left: 20px;";
    css += "} ";
    css += "#state {";
    css += "text-align: right;";
    css += "} ";
    css += "#text {";
    css += "margin: 10px;";
    css += "} ";
    css += ".img {";
    css += "height:15px;";
    css += "width:15px;";
    css += "float:right;";
    css += "margin-right: 5px;";
    css += "cursor:pointer;";
    css += "} ";
    css += "</style>";
    return css;
}

function moveFunction(){
    var moveFunc = "var img_L = 0;var img_T = 0;var targetObj;";
    moveFunc += "function getLeft(o){return parseInt(o.style.left.replace('px', ''));}";
    moveFunc += "function getTop(o){return parseInt(o.style.top.replace('px', ''));}";
    moveFunc += "function moveDrag(e){var e_obj = window.event? window.event : e;var dmvx = parseInt(e_obj.clientX + img_L);var dmvy = parseInt(e_obj.clientY + img_T);targetObj.style.left = dmvx +\"px\";targetObj.style.top = dmvy +\"px\";return false;};";
    moveFunc += "function startDrag(e, obj){var x = obj.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;targetObj = x;var e_obj = window.event? window.event : e;img_L = getLeft(x) - e_obj.clientX;img_T = getTop(x) - e_obj.clientY;document.onmousemove = moveDrag;document.onmouseup = stopDrag;if(e_obj.preventDefault)e_obj.preventDefault();}";
    moveFunc += "function stopDrag(){document.onmousemove = null;document.onmouseup = null;}";
    return moveFunc;
}

function newButton(pointX, pointY) {
    if(count == 0){
        var jqueryScript = document.createElement("script");
        jqueryScript.setAttribute("src","https://code.jquery.com/jquery-3.4.1.min.js");
        document.head.appendChild(jqueryScript);

        var moveFunctionScript = document.createElement("script");
        moveFunctionScript.setAttribute("type","text/javascript");
        moveFunctionScript.innerHTML = moveFunction();
        document.head.appendChild(moveFunctionScript);
        
        document.head.innerHTML += addCss();
        document.body.innerHTML += "<div id = \"allMemo\"></div>";
    }
    ++count;
    var inner = "<div id =\"memo" + count + "\">";
    inner += "<div id=\"divpop\" style=\"left:"+pointX+"px;top:"+pointY+"px;width:300px;height:300px;\">";
    inner += "<table class=\"table\">";
    inner += "<tr>";
    inner += "<td class=\"td\">";
    inner += "<div id=\"state\">";
    inner += "<img class=\"img\" src=\"https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FZ1poB%2FbtqCB89D0pX%2FwEPiFYyksN2TtPZWOFQyQk%2Fimg.png\" alt=\"close\" onclick=\"$('#memo" + count + "').remove()\">";
    inner += "<img class=\"img\" src=\"https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FXr0hx%2FbtqCDkowjR9%2FhH6DySs67UvbDOurTFy7rk%2Fimg.png\" alt=\"move\" onmousedown=\"startDrag(event, this)\">";
    inner += "</div>";
    inner += "<p class=\"title\"> Memo </p>";
    inner += "<textarea id=\"memotext\"></textarea>";
    inner += "</td>";
    inner += "</tr>";
    inner += "</table>";
    inner += "</div>";
    inner += "</div>";
    inner += "</div>";
    document.getElementById("allMemo").innerHTML += inner;
}

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
            newButton(request.gPos.pageX,request.gPos.pageY);
            document.getElementById("memotext").style.color="#000000";
            document.getElementById("memotext").style.fontSize = "14px";
            port.postMessage({result:"success"});
        }else if(request.connect === 'popup'){
            document.getElementById("memotext").style.color = request.fontColor;
            document.getElementById("memotext").style.fontFamily = request.fontFamily;
            document.getElementById("memotext").style.fontSize = request.fontSize + "px";
            document.getElementById("memotext").style.backgroundColor = request.backgroundColor;

            port.postMessage({result:"success"});
        }
    });
});

