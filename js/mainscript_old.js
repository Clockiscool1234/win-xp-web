var languages = {
	"FR" : {
		"Close" : "Fermer",
		"Maximize" : "Agrandir",
		"Restore" : "Restaurer",
		"Minimize" : "Réduire",
		"WelcomeMessage" : "Mais wesh apprend l'anglais",
		"WelcomeMessageTitle" : "Bienvenue sur Windows XP !",
		"Start" : "démarrer",
		"BrowserOffice" : "The Browser's Office",
		"notepad" : "Bloc-notes",
		"notepadWindow" : "%1 - Bloc-notes",
		"notepadWindow_NoFile" : "Untitled - Notepad"
	},
	"EN" : {
		"Close" : "Close",
		"Maximize" : "Maximize",
		"Restore" : "Restore",
		"Minimize" : "Minimize",
		"WelcomeMessage" : "Welcome to Windows XP Simulator !\r\n\n This is a small project that i've been working on. I hope you like it ! It is actually available in two languages (French, English)",
		"WelcomeMessageTitle" : "Welcome to Windows XP !",
		"Start" : "start",
		"BrowserOffice" : "The Browser's Office",
		"notepad" : "Notepad",
		"notepadWindow" : "%1 - Notepad",
		"notepadWindow_NoFile" : "Untitled - Notepad"
	}
}

var userData = {
	"Username" : "Administrator",
	"ProfilePictureID" : 0,
	"ThemeFile" : "css/LunaBlue.css",
	"selectedLanguage" : "FR",
	"DesktopFiles" : [
		{
			"name" : "Programme",
			"FileExtension" : "js",
			"Content" : "Hello, world !"
		},
		{
			"name" : "Programme2",
			"FileExtension" : "js",
			"Content" : ""
		}
	]
};

var Windows_Registry = {
	"FileExts" : {
		"js" : {
			"icon" : "img/icons/js.ico"
		}
	}
}
function Login(userData) {
	if (userData) {
		userData = JSON.parse(userData);
	}
}

window.addEventListener("load", function() {
	document.body.style.cursor = "var(--default-cursor)";
	document.body.addEventListener("contextmenu", function(e) {
		e.preventDefault();
	});
	var startButton = document.getElementsByTagName("startButton")[0];
	startButton.getElementsByTagName("a")[0].innerText = languages[userData["selectedLanguage"]]["Start"];
	startButton.addEventListener("mousedown", function(e) {
		if (document.activeElement == startButton) {
			startButton.blur();
		} else {
			startButton.focus();
		}
		e.preventDefault();
	});
	
	startButton.tabIndex = 0;
	var startMenu = document.getElementsByTagName("startMenu")[0];
	
	startMenu.addEventListener("mousedown", function(e) {
		e.stopPropagation();
		e.preventDefault();
	});
	// document.body.getElementsByTagName("taskbar")[0].addEventListener("mousedown", function() {
		// startMenu.style.display = "none";
	// });
	// document.body.getElementsByTagName("WindowManager")[0].addEventListener("mousedown", function() {
		// startMenu.style.display = "none";
	// });
	
	function updateTime() {
		var d = new Date();
		var nH = d.getHours().toString();
		if (nH.length < 2) {
			nH = "0" + nH;
		}
		var nM = d.getMinutes().toString();
		if (nM.length < 2) {
			nM = "0" + nM;
		}
		document.getElementById("Windows_clock").innerText = nH + ":" + nM;
		
		
	}
	setInterval(function() {
		updateTime();
	}, 1000);
	// var w = WindowAPI_CreateWindow(languages[userData["selectedLanguage"]]["WelcomeMessageTitle"]);
	// w.settings.canResize = false;
	// w.titlebar.max.style.display = "none";
	// w.titlebar.min.style.display = "none";
	// w.content.innerText = languages[userData["selectedLanguage"]]["WelcomeMessage"]
	
	
	//
	// Start menu
	//
	
	var startMenu_Programs = document.getElementById("StartMenu_ProgramsSection");
	
	//
	// StartMenuPrograms
	//
	if (true) {
		function whenProgramOpen() {
			var w = WindowAPI_CreateWindow("Iframe Browser");
			var iframe = document.createElement("iframe");
			iframe.src = "https://www.bing.com/";
			iframe.style.boxSizing = "border-box";
			iframe.style.width = "100%";
			iframe.style.height = "100%";
			iframe.style.border = "1px solid #000";
			w.content.appendChild(iframe);
			w.focus();
			
			w.onmousedown();
		}
		var b = document.createElement("menuBand");
		var t = document.createElement("a");
		var img = document.createElement("img");
		t.style.fontWeight = "bold";
		t.innerText = "Iframe Browser";
		img.src = "img/Start/Icon_111.png";
		
		b.appendChild(img);
		b.appendChild(t);
		
		b.addEventListener("click", whenProgramOpen);
		startMenu_Programs.appendChild(b);
	}
	if (true) {
		function whenProgramOpen(file) {
			
			var w;
			var t = document.createElement("textarea");
			t.innerText = "";
			if (file != undefined) {
				w = WindowAPI_CreateWindow(languages[userData["selectedLanguage"]]["notepadWindow"].replace("%1", file.name), true);
			t.innerText = file.Content;
			} else {
				w = WindowAPI_CreateWindow(languages[userData["selectedLanguage"]]["notepadWindow_NoFile"], true);
			}
			t.style.boxSizing = "border-box";
			t.style.width = "100%";
			t.style.height = "100%";
			w.content.appendChild(t);
			w.focus();
			w.file = file;
			// w.mousedown();
			
			console.log(file);
		}
		
		Windows_Registry.FileExts.js.defaultProgram = whenProgramOpen;
		var b = document.createElement("menuBand");
		var t = document.createElement("a");
		var img = document.createElement("img");
		t.innerText = languages[userData["selectedLanguage"]]["notepad"];
		img.src = "img/icons/notepad.ico";
		
		b.appendChild(img);
		b.appendChild(t);
		
		b.addEventListener("click", function() {
			whenProgramOpen();
		});
		startMenu_Programs.appendChild(b);
	}
	
	
	//
	//DesktopFiles
	//
	
	for (i = 0; i < userData.DesktopFiles.length; i++) {
		var f = userData.DesktopFiles[i];
		var desktopIcon = document.createElement("div");
		var desktopIconImage = document.createElement("icon");
		var desktopIconName = document.createElement("a");
		desktopIcon.tabIndex = 0;
		
		if (Windows_Registry["FileExts"][f["FileExtension"]]) {
			console.log(Windows_Registry["FileExts"][f["FileExtension"]].f);
			desktopIconImage.style.backgroundImage = "url('" + Windows_Registry["FileExts"][f["FileExtension"]].icon + "')";
			// img.src = "img/icons/Icon_6.ico";
			desktopIcon.addEventListener("dblclick", function() {
				console.log("open");
				Windows_Registry["FileExts"][f["FileExtension"]].defaultProgram(f);
			});
		} else {
			desktopIconImage.style.backgroundImage = "url('img/icons/Icon_6.ico')";
		}
		
		desktopIconName.innerText = f.name;
		desktopIcon.appendChild(desktopIconImage);
		desktopIcon.appendChild(document.createElement("br"));
		desktopIcon.appendChild(desktopIconName);
		desktopIcon["file"] = f;
		document.getElementById("Desktop").appendChild(desktopIcon);
	}
});








//You shall not pass !
function HelloThere() {
	var w = WindowAPI_CreateWindow("Hey, you !");
	w.content.innerHTML = "Hey, you ! Yes, you ! It looks like you found a <b>secret</b> ! Even if this Window is completly useless, it's kind of funny to know that there's something hidden in this XP. Anyways, i need to go finish this work. <font color=" + '"#F00">B</font><font color="#0F0">Y</font><font color="#00F">E</font>' 
	w.titlebar.max.style.display = "none";
	w.titlebar.min.style.display = "none";
	w.settings.canResize = false;
	
	return "It's time to get back on the computer !";
}