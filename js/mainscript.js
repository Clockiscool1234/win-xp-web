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
		"notepadWindow_NoFile" : "Sans titre - Bloc-notes",
		"open" : "Ouvrir",
		"edit" : "Modifier",
		"InternetExplorer" : "Internet Explorer",
		"WebXP_Documentation" : "Documentation (Anglais)",
		"file" : "Fichier"
	},
	"EN" : {
		"Close" : "Close",
		"Maximize" : "Maximize",
		"Restore" : "Restore",
		"Minimize" : "Minimize",
		"Demo_WelcomeMessage" : "Welcome to Windows XP Simulator !\r\n\n This is a (limited) web version of the Win XP sim. To access all features, download the full version <a href=\"javascript:alert('no')\">here</a> !",
		"Demo_WelcomeMessageTitle" : "Welcome to Windows XP Simulator !",
		"Start" : "start",
		"BrowserOffice" : "The Browser's Office",
		"notepad" : "Notepad",
		"notepadWindow" : "%1 - Notepad",
		"notepadWindow_NoFile" : "Untitled - Notepad",
		"open" : "Open",
		"edit" : "Edit",
		"InternetExplorer" : "Internet Explorer",
		"WebXP_Documentation" : "API Documentation",
		"file" : "File"
	},
	"Code" : {
		"Close" : "Close",
		"Maximize" : "Maximize",
		"Restore" : "Restore",
		"Minimize" : "Minimize",
		"WelcomeMessage" : "WelcomeMessage",
		"WelcomeMessageTitle" : "WelcomeMessageTitle",
		"Start" : "Start",
		"BrowserOffice" : "BrowserOffice",
		"notepad" : "notepad",
		"notepadWindow" : "notepadWindow %1",
		"notepadWindow_NoFile" : "notepadWindow_NoFile",
		"open" : "open",
		"edit" : "edit",
		"InternetExplorer" : "InternetExplorer",
		"WebXP_Documentation" : "WebXP_Documentation",
		"file" : "file"
	},
	"undefinedLanguage" : {
		
	}
}

var userData = {
	"Username" : "User",
	"ProfilePictureID" : 0,
	"ThemeFile" : "css/LunaBlue.css",
	"selectedLanguage" : "EN",
	"DesktopFiles" : [
		{
			"name" : "Welcome",
			"FileExtension" : "js",
			"Content" : "Welcome to Windows XP Simulator !"
		}
	]
};

var Windows_Registry = {
	"FileExts" : {
		"js" : {
			"icon" : "img/Icons/js.ico",
			"defaultProgram" : function(file) {
				try {
					eval(file.Content);
				} catch(ex) {
					WindowAPI.ShowError(ex.toString(), file.name, 1);
				}
			},
			"defaultEditProgram" : function(file) {
				WindowAPI.loadProgram.fromURL("js/soft/notepad.js", {file : file})
			}
		},
		"txt" : {
			"icon" : "img/Icons/notepadIcon.ico",
			"defaultProgram" : function(file) {
				WindowAPI.loadProgram.fromURL("js/soft/notepad.js", {file : file})
			},
			"defaultEditProgram" : function(file) {
				WindowAPI.loadProgram.fromURL("js/soft/notepad.js", {file : file})
			}
		},
		".folder" : {
			"icon" : "img/Icons/folder.png",
			"defaultProgram" : function(folder) {
				WindowAPI.loadProgram.fromURL("js/soft/explorer.js", {folder : folder})
			},
			"defaultEditProgram" : function(folder) {
				WindowAPI.loadProgram.fromURL("js/soft/explorer.js", {folder : folder})
			}
		}
	}
}


function Login(userData) {
	if (userData) {
		userData = JSON.parse(userData);
	}
}

function saveUserData() {
	// var allUsers = JSON.stringify(localStorage.getItem("WindowsXPSim_UserData"));
	// var selectedUserID = localStorage.getItem("WindowsXPSim_SelectedUserID");
	// allUsers[parseInt(selectedUserID)] = userData;
	// localStorage.setItem('WindowsXPSim_UserData', JSON.stringify(allUsers));
}
window.addEventListener("load", function() {
	document.body.style.cursor = "var(--default-cursor)";
	
	
	WindowAPI.showLogonui();
	document.addEventListener("click", function() {
		var taskbarTasks = document.getElementById("taskbarTasks");
		for(var i = 0; i < taskbarTasks.children.length; i++) {
			taskbarTasks.children[i].classList.remove("activeWindow");
		}
	});
	setTimeout(function() {document.getElementById("bootscreen").remove();}, 3500);
	document.body.addEventListener("keydown", function(ev) {
		console.log(ev.key);
		console.log(ev.altKey);
		if (ev.key.toLowerCase() == "enter" && ev.altKey) {
			if (!window.screenTop && !window.screenY) {
				document.exitFullscreen();
			} else {
				document.body.requestFullscreen();
			}
		}
	});
});






window.addEventListener("DOMContentLoaded", function() {
	
});

//You shall not pass !
function HelloThere() {
	var w = WindowAPI.CreateWindow("Hey, you !");
	w.content.innerHTML = "Hey, you ! Yes, you ! It looks like you found a <b>secret</b> ! Even if this Window is completly useless, it's kind of funny to know that there's something hidden in this XP. Anyways, i need to go finish this work. <font color=" + '"#F00">B</font><font color="#0F0">Y</font><font color="#00F">E</font>' 
	w.titlebar.max.style.display = "none";
	w.titlebar.min.style.display = "none";
	w.settings.canResize = false;
	
	return "It's time to get back on the computer !";
}