var main = function(args) {
    var w;
    var t = document.createElement("textarea");
    t.innerText = "";
    if (args["file"] != undefined) {
        w = WindowAPI.CreateWindow(languages[userData["selectedLanguage"]]["notepadWindow"].replace("%1", args["file"].name), true);
        t.innerText = args["file"].Content;
    } else {
        w = WindowAPI.CreateWindow(languages[userData["selectedLanguage"]]["notepadWindow_NoFile"], true);
    }
    t.style.boxSizing = "border-box";
    t.style.width = "100%";
    t.style.height = "100%";
    var MainMenuJSON = {
        "Fichier" : [
        
        ],
        "Edition" : [
            
        ]
    }
    // w.content.appendChild(mainMenu);
    w.content.appendChild(t);
    w.focus();
    w.file = args["file"];
    w.setIcon("img/Icons/notepad.ico");
    // w.mousedown();
    
    console.log(args);
}