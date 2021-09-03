

var WindowAPI = {
	"OnMouseOver" : function(w, event) {
		if (w == event.target && w.settings.canResize && w.className == "") {
			var pos = {
				"X" : event.pageX - parseInt(w.style.left),
				"Y" : event.pageY - parseInt(w.style.top)
			}
			w.style.cursor = "var(--default-cursor)";
			if (pos.X < WindowAPI.borderwidth) w.style.cursor = "var(--horizontal-resize)";
			if (pos.Y < WindowAPI.borderwidth) w.style.cursor = "var(--vertical-resize)";
			if (pos.X > parseInt(w.style.width) - WindowAPI.borderwidth) w.style.cursor = "var(--horizontal-resize)";
			if (pos.Y > parseInt(w.style.height) - WindowAPI.borderwidth) w.style.cursor = "var(--vertical-resize)";
			
			if (pos.X < WindowAPI.borderwidth && pos.Y < WindowAPI.borderwidth) w.style.cursor = "var(--diagonal-resize)";
			if (pos.Y < WindowAPI.borderwidth && pos.X > parseInt(w.style.width) - WindowAPI.borderwidth) w.style.cursor = "var(--diagonal-two-resize)";
			if (pos.X > parseInt(w.style.width) - WindowAPI.borderwidth && pos.Y > parseInt(w.style.height) - WindowAPI.borderwidth) w.style.cursor = "var(--diagonal-resize)";
			if (pos.Y > parseInt(w.style.height) - WindowAPI.borderwidth && pos.X < WindowAPI.borderwidth) w.style.cursor = "var(--diagonal-two-resize)";
		} else {
			w.style.cursor = "var(--default-cursor)";
		}
	},
	
	"StartMoving" : function(w, e) {
		WindowAPI.zIndex++;
		w.style.zIndex = WindowAPI.zIndex;
		var pos = {
			"X" : event.pageX - parseInt(w.style.left),
			"Y" : event.pageY - parseInt(w.style.top)
		}
		if (w == event.target) {
			if (pos.X >= WindowAPI.borderwidth && pos.Y >= WindowAPI.borderwidth && pos.X <= parseInt(w.style.width) - WindowAPI.borderwidth && pos.Y <= parseInt(w.style.height) - WindowAPI.borderwidth) {
				function WindowAPI_WindowMove(e2) {
					w.style.left = (parseInt(e2.pageX) - pos.X) + "px";
					w.style.top = (parseInt(e2.pageY) - pos.Y) + "px";
				}
				
				document.body.addEventListener("mouseup", function() {
					document.body.removeEventListener("mousemove", WindowAPI_WindowMove);
				});
				document.body.addEventListener("mousemove", WindowAPI_WindowMove);
			} else {
				if (pos.X < WindowAPI.borderwidth && w.settings.canResize) {
					var x = parseInt(w.style.left) + parseInt(w.style.width);
					// var y = parseInt(w.style.top) + parseInt(w.style.height);
					
					function size(e2) {
						n = x - event.pageX;
						
						if (n > parseInt(w.style.minWidth)) {
							w.style.width = n + "px";
						} else {
							w.style.width = w.style.minWidth;
						}
						w.style.left = event.pageX + "px";
					}
				
					document.body.addEventListener("mouseup", function() {
						document.body.removeEventListener("mousemove", size);
					});
					document.body.addEventListener("mousemove", size);
				}
				if (pos.Y < WindowAPI.borderwidth && w.settings.canResize) {
					// var x = parseInt(w.style.left) + parseInt(w.style.width);
					var y = parseInt(w.style.top) + parseInt(w.style.height);
					
					function size(e2) {
						n = y - event.pageY;
						
						if (n > parseInt(w.style.minHeight)) {
							w.style.height = n + "px";
						} else {
							w.style.height = w.style.minHeight;
						}
						w.style.top = event.pageY + "px";
					}
				
					document.body.addEventListener("mouseup", function() {
						document.body.removeEventListener("mousemove", size);
					});
					document.body.addEventListener("mousemove", size);
				}
				if (pos.X > parseInt(w.style.width) - WindowAPI.borderwidth && w.settings.canResize) {
					function WindowAPI_WindowRightSize(e2) {
						var n = e2.pageX - parseInt(w.style.left) + 2.5;
						if (n > parseInt(w.style.minWidth)) {
							w.style.width = n + "px";
						} else {
							w.style.width = w.style.minWidth;
						}
					}
				
					document.body.addEventListener("mouseup", function() {
						document.body.removeEventListener("mousemove", WindowAPI_WindowRightSize);
					});
					document.body.addEventListener("mousemove", WindowAPI_WindowRightSize);
				}
				if (pos.Y > parseInt(w.style.height) - WindowAPI.borderwidth && w.settings.canResize) {
					function WindowAPI_Size(e2) {
						var n = e2.pageY - parseInt(w.style.top) + 2.5;
						if (n > parseInt(w.style.minHeight)) {
							w.style.height = n + "px";
						} else {
							w.style.height = w.style.minHeight;
						}
					}
				
					document.body.addEventListener("mouseup", function() {
						document.body.removeEventListener("mousemove", WindowAPI_Size);
					});
					document.body.addEventListener("mousemove", WindowAPI_Size);
				}
			}
				
		}
			
	},
	"CreateWindow" : function(name, autoFocus) {
		var w = document.createElement("window");
		document.body.getElementsByTagName("WindowManager")[0].appendChild(w);


		w.tabIndex = 0;
		w.addEventListener("mousedown", function() {
			WindowAPI.StartMoving(this, event);
		});
		w.addEventListener("mousemove", function() {
			WindowAPI.OnMouseOver(this, event);
		});
		w.addEventListener("dblclick", function() {
			var pos = {
				"X" : event.pageX - parseInt(w.style.left),
				"Y" : event.pageY - parseInt(w.style.top)
			};
			
			if (w.settings.canResize && event.target == w) {
				if (w.className == "maxWindow") {
					w.className = "";
				} else {
					w.className = "maxWindow";
				}
			}
		});
		w.style.width = "250px";
		w.style.height = "250px";
		w.style.left = "50px";
		w.style.top = "50px";
		
		
		w.style.minHeight = "33.5px";
		w.style.minWidth = "100.5px";
		
		w.Close = function() {
			WindowAPI.CloseWindow(w);
		};

		var t = document.createElement("titlebar");
		w.appendChild(t);
		var title = document.createElement("a");
		var icon = document.createElement("div");
		
		var closebutton = document.createElement("closeButton");
		closebutton.addEventListener("mouseover", function() {this.title = languages[userData.selectedLanguage]['Close']});
		var maxbutton = document.createElement("maxButton");
		maxbutton.addEventListener("mouseover", function() {this.title = languages[userData.selectedLanguage]['Maximize']});
		var minbutton = document.createElement("minButton");
		minbutton.addEventListener("mouseover", function() {this.title = languages[userData.selectedLanguage]['Minimize']});
		t.appendChild(closebutton);
		closebutton.addEventListener("click", function() {
			WindowAPI.CloseWindow(w);
		});
		t.appendChild(maxbutton);
		maxbutton.addEventListener("click", function() {
			WindowAPI.MaxWindow(w);
		});
		minbutton.addEventListener("click", function() {
			WindowAPI.MinWindow(w);
		});
		t.appendChild(minbutton);
		t.appendChild(title);
		var titleText = document.createElement("a");
		if (name) {
			titleText.innerText = name;
		}
		title.appendChild(icon);
		titleText.style.display = "inline-block";
		titleText.style.textOverflow = "ellipsis";
		titleText.style.whiteSpace = "nowrap";
		title.appendChild(titleText);
		icon.src = "#";
		var content = document.createElement("content");
		w.appendChild(content);
		w.content = content;
		// w["setIcon"] = function(iconURL) {
		// 	icon.style.backgroundImage = "url('" + iconURL + "')";
		// }
		w.settings = {};
		w.settings["canResize"] = true;
		w.settings["canResize"] = true;
		w.settings["canResize"] = true;
		w.onclose = null;
		w.titlebar = {};
		w.titlebar["close"] = closebutton;
		w.titlebar["max"] = maxbutton;
		w.titlebar["min"] = minbutton;
		w.titlebar["title"] = title;
		
		var taskbarTasks = document.getElementById("taskbarTasks");
		w.taskbarItem = document.createElement("div");
		taskbarTasks.appendChild(w.taskbarItem);
		var taskbarIcon = document.createElement("null");
		taskbarIcon.className = "img";
		var taskbarText = document.createElement("a");
		taskbarText.innerText = name;
		w.taskbarItem.appendChild(taskbarIcon);
		w.taskbarItem.appendChild(taskbarText);
		taskbarTasks.appendChild(w.taskbarItem);
		w.taskbarItem.tabIndex = 0;
		WindowAPI.zIndex++;
		w.style.zIndex = WindowAPI.zIndex;
		
		w.setTitle = function(newT) {
			titleText.innerText = newT;
			taskbarText.innerText = newT;
		};
		
		w.setIcon = function(url) {
			icon.style.backgroundImage = "url('" + url + "')";
			taskbarIcon.style.backgroundImage = "url('" + url + "')";
		}
		if (autoFocus) {
			WindowAPI.zIndex++;
			w.style.zIndex = WindowAPI.zIndex;
		}
		w.setIcon("img/Icons/js_small.ico");
		w.addEventListener("focus", function() {
			var taskbarItems = taskbarTasks.getElementsByTagName("div");
			for(var i = 0; i < taskbarItems.length; i++) {
				taskbarItems[i].classList.remove("activeWindow");
			}
			w.taskbarItem.classList.add("activeWindow");
		});
		w.addEventListener("blur", function() {
			w.taskbarItem.classList.remove("activeWindow");
		});
		w.taskbarItem.addEventListener("click", function() {
			if (w.taskbarItem.classList.contains("activeWindow")) {
				WindowAPI.MinWindow(w);
			} else {
				WindowAPI.ResWindow(w);
			}
		});
		return w;
	},
	"borderwidth" : 8,
	"zIndex" : 0,
	
	"MaxWindow" : function(w) {	
		if (w.settings.canResize) {
			if (w.className == "maxWindow") {
				w.className = "";
			} else {
				w.className = "maxWindow";
			}
		}
	},

	"ResWindow" : function(w) {
		w.style.display = "block";
		w.focus();
		WindowAPI.StartMoving(w, {target : null});
	},
	"MinWindow" : function(w) {
		w.style.display = "none";
		w.blur();
	},
	
	"CloseWindow" : function(w) {
		if (w.onclose) {
			if (!w.onclose()) {
				return;
			}
		}
		w.taskbarItem.remove();
		w.remove()
		
	}
}
WindowAPI["StartMenu"] = {};
WindowAPI["StartMenu"]["Add"] = function(name, call, iconSrc) {
		var startMenu_Programs = document.getElementById("StartMenu_ProgramsSection");
		var b = document.createElement("menuBand");
		var t = document.createElement("a");
		var img = document.createElement("img");
		t.innerText = name;
		img.src = iconSrc;
		
		b.appendChild(img);
		b.appendChild(t);
		
		b.addEventListener("click", function() {
			call();
		});
		startMenu_Programs.appendChild(b);
}

WindowAPI["isNode"] = false;

// Renderer process
if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
	WindowAPI["isNode"] = true;
}

// Main process
if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
	WindowAPI["isNode"] = true;
}

// Detect the user agent when the `nodeIntegration` option is set to true
if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
	WindowAPI["isNode"] = true;
}

WindowAPI["showContextMenu"] = function(JSONContextMenu, elem, clickEvent) {
	var contextMenu = document.createElement("contextMenu");
	
	var elemParent = elem;
	
	contextMenu.tabIndex = 0;
	
	function checkIfParentNode() {
		elemParent = elemParent.parentElement
		if (!elemParent.tagName.toUpperCase() == "WINDOW" && !elemParent.tagName.toUpperCase() == "BODY") {
			checkIfParentNode();
		}
	}
	
	checkIfParentNode();
	
	contextMenu.addEventListener("blur", function() {
		this.remove();
		elemParent.focus();
	});
	for (i = 0; i < JSONContextMenu.length; i++) {
		var e = document.createElement("p");
		var s = JSONContextMenu[i];
		e.innerText = s.name;
		function createTheOnClick(func) {
			e.onclick = function() {
				event.stopPropagation();
				event.preventDefault();
				contextMenu.blur();
				func();
			};
		}
		createTheOnClick(s.click);
		contextMenu.appendChild(e);
	}
	
	
	
	// elemParent.appendChild(contextMenu);
	document.body.appendChild(contextMenu);
	contextMenu.style.zIndex = 999999999999999999;
	contextMenu.style.left = clickEvent.pageX + 1 + "px";
	contextMenu.style.top = clickEvent.pageY + 1 + "px";
	contextMenu.focus();
}

WindowAPI["script"] = {};
WindowAPI["script"]["loadFrom"] = function(file) { 
	var script  = document.createElement('script'); 
	script.src  = file; 
	script.type = 'text/javascript'; 
	script.defer = true; 
	document.getElementsByTagName('head').item(0).appendChild(script); 
  
}
WindowAPI["errorIcons"] = ["url('img/Icons/Icon_52.ico')", "url('img/Icons/Icon_60.png')", "url('img/Icons/Icon_49.ico')"];
WindowAPI["ShowError"] = function(errorText, errorTitle, errorIconID) {
	var w = WindowAPI.CreateWindow(errorTitle);
	w.titlebar.max.style.display = "none";
	w.titlebar.min.style.display = "none";
	w.settings.canResize = false;
	var i = document.createElement("div");
	
	i.style.backgroundImage = WindowAPI["errorIcons"][errorIconID];
	i.style.width = "40px";
	i.style.height = "calc(100% - 31px)";
	i.style.backgroundRepeat = "no-repeat";
	i.style.backgroundPosition = "center";
	i.style.position = "absolute";
	i.style.left = "0px";
	i.style.top = "0px";
	w.style.height = "150px";
	w.content.appendChild(i);
	
	var buttons = document.createElement("div");
	buttons.style.position = "absolute";
	buttons.style.right = "10px";
	buttons.style.left = "10px";
	buttons.style.bottom = "10px";
	buttons.style.textAlign = "center";
	
	var okButton = document.createElement("xpButton");
	okButton.innerText = "OK";
	buttons.appendChild(okButton);
	w.content.appendChild(buttons);
	w.style.minHeight = "114px";
	w.style.minWidth = "100px";
	okButton.addEventListener("click", function() {
		w.Close();
	});
	
	var t = document.createElement("p");
	t.style.maxWidth = "50vw";
	t.style.verticalAlign = "middle";
	t.style.position = "absolute";
	t.style.left = "40px";
	t.style.top = "0px";
	t.style.minHeight = "45px";
	t.style.display = "block";
	t.style.padding = "0px";
	t.style.margin = "5px 0px";
	t.innerText = errorText;
	
	w.content.appendChild(t);
	
	w.style.width = t.clientWidth + 55 + "px";
	w.style.height = t.clientHeight + 81 + "px";
}