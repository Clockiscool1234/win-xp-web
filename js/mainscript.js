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
			"icon" : "img/icons/js.ico"
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
	
	function LogIn() {
			//Save Data when closed
		window.addEventListener("beforeunload", saveUserData, false);
		
		//Taskbar
		var taskbarTasks = document.getElementById("taskbarTasks");
		
		//Error Handler
		window.onerror = function(messageOrEvent, source, noligne, nocolonne, erreur) {
			WindowAPI.ShowError([messageOrEvent, source, noligne, nocolonne, erreur].join("\r\n"), "Error", 1);
			console.log([messageOrEvent, source, noligne, nocolonne, erreur]);
		}
		
		//Load Data
		if (localStorage.getItem('WindowsXPSim_UserData')) {
			var allUsers = JSON.stringify(localStorage.getItem("WindowsXPSim_UserData"));
			var selectedUserID = localStorage.getItem("WindowsXPSim_SelectedUserID");
			$.extend(userData, allUsers[selectedUserID]);
		}
		
		//Put cursor and disable context menu
		document.body.addEventListener("contextmenu", function(e) {
			e.preventDefault();
		});
		
		//Configures StartMenu and StartButton
		var startButton = document.getElementsByTagName("startButton")[0];
		startButton.getElementsByTagName("a")[0].innerText = languages[userData["selectedLanguage"]]["Start"];
		console.log(languages[userData["selectedLanguage"]]["Start"]);
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
		
		
		//Taskbar clock
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
		// var w = WindowAPI.CreateWindow(languages[userData["selectedLanguage"]]["WelcomeMessageTitle"]);
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
				var w = WindowAPI.CreateWindow("Internet Explorer");
				var iframe = document.createElement("iframe");
				iframe.src = "https://www.bing.com/";
				iframe.style.boxSizing = "border-box";
				iframe.style.width = "100%";
				iframe.style.height = "100%";
				iframe.style.border = "1px solid #000";
				w.content.appendChild(iframe);
				w.focus();
				w.setIcon("img/Icons/iexplore16.png");
			}
			// var b = document.createElement("menuBand");
			// var t = document.createElement("a");
			// var img = document.createElement("img");
			// t.style.fontWeight = "bold";
			// t.innerText = "Iframe Browser";
			// img.src = "img/Start/Icon_111.png";
			
			// b.appendChild(img);
			// b.appendChild(t);
			
			// b.addEventListener("click", whenProgramOpen);
			// startMenu_Programs.appendChild(b);
			WindowAPI.StartMenu.Add(languages[userData["selectedLanguage"]]["InternetExplorer"], whenProgramOpen, "img/icons/iexplore48.png");
		}
		
		if (true) {
			function whenProgramOpen(file) {
				try {
					eval(file.Content);
				} catch(ex) {
					WindowAPI.ShowError(ex.toString(), file.name, 1);
				}
			}
			Windows_Registry.FileExts.js.defaultProgram = whenProgramOpen;
		}
		if (true) {
			function whenProgramOpen(file) {
				
				var w;
				var t = document.createElement("textarea");
				t.innerText = "";
				if (file != undefined) {
					w = WindowAPI.CreateWindow(languages[userData["selectedLanguage"]]["notepadWindow"].replace("%1", file.name), true);
				t.innerText = file.Content;
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
				w.file = file;
				// w.mousedown();
				
				console.log(file);
			}
			
			Windows_Registry.FileExts.js.defaultEditProgram = whenProgramOpen;
			// var b = document.createElement("menuBand");
			// var t = document.createElement("a");
			// var img = document.createElement("img");
			// t.innerText = languages[userData["selectedLanguage"]]["notepad"];
			// img.src = "img/icons/notepad.ico";
			
			// b.appendChild(img);
			// b.appendChild(t);
			
			// b.addEventListener("click", function() {
				// whenProgramOpen();
			// });
			// startMenu_Programs.appendChild(b);
			WindowAPI.StartMenu.Add(languages[userData["selectedLanguage"]]["notepad"], whenProgramOpen, "img/icons/notepad.ico");
			
			
		}
		
		if (true) {
			function whenProgramOpen() {
				var w = WindowAPI.CreateWindow("Web XP's Documentation");
				var iframe = document.createElement("iframe");
				iframe.src = "documentation.html";
				iframe.style.boxSizing = "border-box";
				iframe.style.width = "100%";
				iframe.style.height = "100%";
				iframe.style.border = "1px solid #000";
				w.content.appendChild(iframe);
				w.focus();
			}
			
			WindowAPI.StartMenu.Add(languages[userData["selectedLanguage"]]["WebXP_Documentation"], whenProgramOpen, "img/icons/notepad.ico");
			
			
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
					Windows_Registry["FileExts"][f["FileExtension"]].defaultProgram(this.file);
				});
			} else {
				desktopIconImage.style.backgroundImage = "url('img/icons/Icon_6.ico')";
			}
			
			desktopIconName.innerText = f.name;
			desktopIcon.appendChild(desktopIconImage);
			desktopIcon.appendChild(document.createElement("br"));
			desktopIcon.appendChild(desktopIconName);
			desktopIcon["file"] = f;
			desktopIcon.addEventListener("contextmenu", function() {
				var f = this.file;
				function whenClicked() {
					Windows_Registry["FileExts"][f["FileExtension"]].defaultProgram(f);
				}
				
				function whenEditClicked() {
					Windows_Registry["FileExts"][f["FileExtension"]].defaultEditProgram(f);
				}
				var cTextMenu = [
					{"name" : languages[userData["selectedLanguage"]]["open"], "click" : whenClicked},
					{"name" : languages[userData["selectedLanguage"]]["edit"], "click" : whenEditClicked}
				]
				
				console.log(cTextMenu);
				WindowAPI.showContextMenu(cTextMenu, this, event);
			});
			document.getElementById("Desktop").appendChild(desktopIcon);
		}
	}
	
	var d = document.createElement("div");
	d.style.boxSizing = "border-box";
	d.style.position = "absolute";
	d.style.width = "100%";
	d.style.height = "100%";
	d.style.left = "0px";
	d.style.top = "0px";
	d.style.backgroundColor = "rgb(90 126 220)";
	// d.style.backgroundImage = "url('img/loginBackground.png')";
	d.style.backgroundRepeat = "no-repeat";
	d.style.borderImage = "url('img/loginBorder.png') 80 0 96 0"
	d.style.borderWidth = "80px 0px 96px 0px";
	d.style.borderStyle = "solid";
	d.style.zIndex = 99999999;
	d.style.textAlign = "center";
	d.style.color = "rgb(239,247,255)";
	d.className = "logonui";
	var cD = document.createElement("center");
	d.appendChild(cD);
	var logInUser = document.createElement("b");
	logInUser.tabIndex = "0";
	logInUser.innerText = "Log-in using text";
	logInUser.style.textAlign = "left";
	var createNewUser = document.createElement("b");
	createNewUser.tabIndex = "0";
	createNewUser.innerText = "Create new user";
	createNewUser.style.textAlign = "left";
	cD.appendChild(logInUser);
	cD.appendChild(createNewUser);
	createNewUser.addEventListener("click", function() {
		LogIn();
		d.remove();
	});
	document.body.appendChild(d);
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