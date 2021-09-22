var main = function(args) {
    var w = WindowAPI.CreateWindow("Internet Explorer");
    var iframe = WindowAPI["isNode"] ? document.createElement("webview") : document.createElement("iframe");
    iframe.setAttribute("src", "https://www.bing.com/");
    // if (iframe.loadUrl) iframe.loadUrl("https://www.bing.com/");
    iframe.style.boxSizing = "border-box";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "1px solid #000";
    iframe.style.display = "block";
    w.content.appendChild(iframe);
    w.focus();
    w.setIcon("img/Icons/iexplore16.png");
}