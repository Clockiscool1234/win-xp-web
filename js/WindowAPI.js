const { cpuUsage } = require('process');

var debug = false;

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
	
	"StartMoving" : function(w, e, target) {
		WindowAPI.zIndex++;
		w.style.zIndex = WindowAPI.zIndex;
		var pos = {
			"X" : e.pageX - parseInt(w.style.left),
			"Y" : e.pageY - parseInt(w.style.top)
		}
		if (w == e.target || target == w) {
			if (pos.X >= WindowAPI.borderwidth && pos.Y >= WindowAPI.borderwidth && pos.X <= parseInt(w.style.width) - WindowAPI.borderwidth && pos.Y <= parseInt(w.style.height) - WindowAPI.borderwidth) {
				// function WindowAPI_WindowMove(e2) {
				// 	w.style.left = (parseInt(e2.pageX) - pos.X) + "px";
				// 	w.style.top = (parseInt(e2.pageY) - pos.Y) + "px";
				// }
				function WindowAPI_WindowMove(x, y) {
					w.style.left = (parseInt(x) - pos.X) + "px";
					w.style.top = (parseInt(y) - pos.Y) + "px";
				}

				function mousemove(e) {
					WindowAPI_WindowMove(e.pageX, e.pageY);
				}

				function touchmove(ev) {
					WindowAPI_WindowMove(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
				}

				function winapi_up() {
					document.body.removeEventListener("mousemove", mousemove);
					document.body.removeEventListener("touchmove", touchmove);
					
				}
				
				document.body.addEventListener("mouseup", winapi_up);
				document.body.addEventListener("touchend", winapi_up);
				// document.body.addEventListener("touchcancel", winapi_up);

				document.body.addEventListener("mousemove", mousemove);
				document.body.addEventListener("touchmove", touchmove);
			} else {
				if (pos.X < WindowAPI.borderwidth && w.settings.canResize) {
					var x = parseInt(w.style.left) + parseInt(w.style.width);
					// var y = parseInt(w.style.top) + parseInt(w.style.height);
					
					function size(e2) {
						var x2 = (e2.changedTouches != null ? e2.changedTouches[0].pageX : e2.pageX);
						var y2 = (e2.changedTouches != null ? e2.changedTouches[0].pageY : e2.pageY);
						n = x - x2;
						
						if (n > parseInt(w.style.minWidth)) {
							w.style.width = n + "px";
							w.style.left = x2 + "px";
						} else {
							w.style.width = w.style.minWidth;
							w.style.left = x - parseInt(w.style.minWidth) - 1;
						}

						// var x2 = (e2.changedTouches != null ? e2.changedTouches[0].pageX : e2.pageX);
						// var y2 = (e2.changedTouches != null ? e2.changedTouches[0].pageY : e2.pageY);
						// n = x - x2;
						
						// if (n > parseInt(w.style.minWidth)) {
						// 	w.style.width = n + "px";
						// } else {
						// 	w.style.width = w.style.minWidth;
						// }
						// w.style.left = x2 + "px";
					}
				
					
				
					document.body.addEventListener("mouseup", function() {
						document.body.removeEventListener("mousemove", size);
						document.body.removeEventListener("touchmove", size);
					});
					document.body.addEventListener("touchend", function() {
						document.body.removeEventListener("mousemove", size);
						document.body.removeEventListener("touchmove", size);
					});
					document.body.addEventListener("mousemove", size);
					document.body.addEventListener("touchmove", size);
				}
				if (pos.Y < WindowAPI.borderwidth && w.settings.canResize) {
					// var x = parseInt(w.style.left) + parseInt(w.style.width);
					var y = parseInt(w.style.top) + parseInt(w.style.height);
					
					function size(e2) {
						var x = (e2.changedTouches != null ? e2.changedTouches[0].pageX : e2.pageX);
						var y2 = (e2.changedTouches != null ? e2.changedTouches[0].pageY : e2.pageY);
						n = y - y2;
						
						if (n > parseInt(w.style.minHeight)) {
							w.style.height = n + "px";
							w.style.top = y2 + "px";
						} else {
							w.style.height = w.style.minHeight;
							w.style.top = y - parseInt(w.style.minHeight) - 1;
						}
					}
				
					
				
					document.body.addEventListener("mouseup", function() {
						document.body.removeEventListener("mousemove", size);
						document.body.removeEventListener("touchmove", size);
					});
					document.body.addEventListener("touchend", function() {
						document.body.removeEventListener("mousemove", size);
						document.body.removeEventListener("touchmove", size);
					});
					document.body.addEventListener("mousemove", size);
					document.body.addEventListener("touchmove", size);
				}
				if (pos.X > parseInt(w.style.width) - WindowAPI.borderwidth && w.settings.canResize) {
					function WindowAPI_WindowRightSize(e2) {
						var x = (e2.changedTouches != null ? e2.changedTouches[0].pageX : e2.pageX);
						var y = (e2.changedTouches != null ? e2.changedTouches[0].pageY : e2.pageY);

						var n = x - parseInt(w.style.left) + 2.5;
						if (n > parseInt(w.style.minWidth)) {
							w.style.width = n + "px";
						} else {
							w.style.width = w.style.minWidth;
						}
					}
				
					document.body.addEventListener("mouseup", function() {
						document.body.removeEventListener("mousemove", WindowAPI_WindowRightSize);
						document.body.removeEventListener("touchmove", WindowAPI_WindowRightSize);
					});
					document.body.addEventListener("touchend", function() {
						document.body.removeEventListener("mousemove", WindowAPI_WindowRightSize);
						document.body.removeEventListener("touchmove", WindowAPI_WindowRightSize);
					});
					document.body.addEventListener("mousemove", WindowAPI_WindowRightSize);
					document.body.addEventListener("touchmove", WindowAPI_WindowRightSize);
				}
				if (pos.Y > parseInt(w.style.height) - WindowAPI.borderwidth && w.settings.canResize) {
					function WindowAPI_Size(e2) {
						var x = (e2.changedTouches != null ? e2.changedTouches[0].pageX : e2.pageX);
						var y = (e2.changedTouches != null ? e2.changedTouches[0].pageY : e2.pageY);
						var n = y - parseInt(w.style.top) + 2.5;
						if (n > parseInt(w.style.minHeight)) {
							w.style.height = n + "px";
						} else {
							w.style.height = w.style.minHeight;
						}
					}
				
					document.body.addEventListener("mouseup", function() {
						document.body.removeEventListener("mousemove", WindowAPI_Size);
						document.body.removeEventListener("touchmove", WindowAPI_Size);
					});
					document.body.addEventListener("touchend", function() {
						document.body.removeEventListener("mousemove", WindowAPI_Size);
						document.body.removeEventListener("touchmove", WindowAPI_Size);
					});
					document.body.addEventListener("mousemove", WindowAPI_Size);
					document.body.addEventListener("touchmove", WindowAPI_Size);
				}
			}
				
		}
			
	},
	"path" : {
		"userprofile" : "C:/Documents And Settings/default/"
	},
	"CreateWindow" : function(name, autoFocus) {
		var w = document.createElement("window");
		document.body.getElementsByTagName("WindowManager")[0].appendChild(w);


		w.tabIndex = 0;
		w.addEventListener("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
		})
		w.addEventListener("mousedown", function() {
			WindowAPI.StartMoving(this, event);
		});
		w.addEventListener("touchstart", function(e) {
			WindowAPI.StartMoving(this,
				e.changedTouches[0], e.target
			);
			this.focus();
		});

		w.addEventListener("mousemove", function() {
			WindowAPI.OnMouseOver(this, event);
		});
		w.addEventListener("touchmove", function(e) {
			WindowAPI.OnMouseOver(this,
				e.changedTouches[0]
			);
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
		w.contextMenu = [
			{
				"name" : "Restore",
				"click" : function() {
					WindowAPI.MaxWindow(w);
					
				},
				"enabled" : () => w.classList.contains("maxWindow") && w.titlebar.max.style.display != "none" && w.settings.canResize,
				"visible" : () => (w.titlebar.max.style.display != "none" && w.titlebar.min.style.display != "none" && w.settings.canResize),
				"iconURLhover" : "#inverted",
				"iconURL" : "img/Icons/ctxtResBlack.png"
			},
			{
				"name" : "Move",
				"enabled" : false
			},
			{
				"name" : "Size",
				"enabled" : false,
				"visible" : () => (w.titlebar.max.style.display != "none" && w.titlebar.min.style.display != "none" && w.settings.canResize)
			},
			{
				"name" : "Minimize",
				"click" : function() {
					WindowAPI.MinWindow(w);
				},
				"enabled" : () => w.titlebar.min.style.display != "none",
				"visible" : () => (w.titlebar.max.style.display != "none" && w.titlebar.min.style.display != "none" && w.settings.canResize),
				"iconURLhover" : "#inverted",
				"iconURL" : "img/Icons/ctxtMinBlack.png"
			},
			{
				"name" : "Maximize",
				"click" : function() {
					WindowAPI.MaxWindow(w);
				},
				"enabled" : () => !w.classList.contains("maxWindow") && w.titlebar.max.style.display != "none" && w.settings.canResize,
				"visible" : () => (w.titlebar.max.style.display != "none" && w.titlebar.min.style.display != "none" && w.settings.canResize),
				"iconURL" : "img/Icons/ctxtMaxBlack.png",
				"iconURLhover" : "#inverted"
			},
			{
				"name" : "-",
				"enabled" : false,
				"visible" : () => (w.titlebar.max.style.display != "none" && w.titlebar.min.style.display != "none" && w.settings.canResize)
			},
			{
				"name" : "<strong>Close</strong>",
				"click" : function() {
					w.Close();
				},
				"enabled" : true,
				"iconURL" : "img/Icons/ctxtCloseBlack.png",
				"iconURLhover" : "#inverted",
				"shortcutText" : "<strong>Alt+F4</strong>"
			}
		];
		
		// title.addEventListener("contextmenu", function(e) {
		// 	WindowAPI.showContextMenu(w.contextMenu, this, e);
		// 	// e.preventDefault();
		// });
		// // title.addEventListener("")
		// title.style.pointerEvents = "all";
		// title.addEventListener("mousedown", function(e) {
		// 	WindowAPI.StartMoving(w, e, e.target);
		// });
		w.addEventListener("contextmenu", function(e) {
			WindowAPI.showContextMenu(w.contextMenu, this, e);
		});

		content.addEventListener("contextmenu", function(e) {
			e.preventDefault();
			e.stopPropagation();
		});

		icon.setAttribute("tabindex", 0);
		icon.tabIndex = 0;
		icon.addEventListener("click", function(e) {
		});
		icon.addEventListener("dblclick", function(e) {
			w.Close();
			e.preventDefault();
		})
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
		
		w.taskbarItem.addEventListener("contextmenu", function(e) {
			WindowAPI.showContextMenu(w.contextMenu, this, e);
		});

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
		w.addEventListener("mousedown", function() {
			var taskbarItems = taskbarTasks.getElementsByTagName("div");
			for(var i = 0; i < taskbarItems.length; i++) {
				taskbarItems[i].classList.remove("activeWindow");
			}
			w.taskbarItem.classList.add("activeWindow");
		});
		w.addEventListener("focus", function() {
			var taskbarItems = taskbarTasks.getElementsByTagName("div");
			for(var i = 0; i < taskbarItems.length; i++) {
				taskbarItems[i].classList.remove("activeWindow");
			}
			w.taskbarItem.classList.add("activeWindow");
		});
		w.addEventListener("blur", function() {
			if (!event.currentTarget.contains(event.relatedTarget)) w.taskbarItem.classList.remove("activeWindow");
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
WindowAPI["loadingState"] = {
	"value" : 0,
	"apply" : function() {
		if (WindowAPI["loadingState"]["value"] < 0) WindowAPI["loadingState"]["value"] = 0;
		document.body.style["cursor"] = (WindowAPI["loadingState"]["value"] > 0 ? "var(--loading-cursor)": "var(--arrow-cursor)");
		// document.body.style["--default-cursor"] = (WindowAPI["loadingState"]["value"] > 0 ? "var(--loading-cursor)": "var(--arrow-cursor)");
	}
};
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

var fs = null;
if (WindowAPI["isNode"]) {
	fs = require('fs');
} else {
	fs = {
		"readdir" : function(path, callback) {
			callback("Not on Electron version");
		}
	};
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
		if (!debug) {
			this.remove();
			elemParent.focus();
		}
	});
	for (i = 0; i < JSONContextMenu.length; i++) {
		var s = JSONContextMenu[i];

		var visible = true;
		if (s["visible"] !== null) {
			if (typeof(s["visible"]) === "function") {
				if (s["visible"]() == false) {
					visible = false;
				}
			} else {
				if (s["visible"] == false) {	
					visible = false;
				}
			}
		}
		if (visible) {
			if (s["name"] == "-") {
				var e = document.createElement("separator");
				contextMenu.appendChild(e);
				continue;
			}

			var e = document.createElement("p");
			var enabled = true;

			if (s["iconURL"] != null) {
				var icon = document.createElement("img");
				icon.width = 16;
				icon.height = 16;
				console.log(icon);
				e.appendChild(icon);
				e.style.display = "flex";
				e.style.paddingLeft = "2px";
	
				icon.style.flex = 1;
				icon.style.maxWidth = 16;
				icon.style.marginRight = "4px";
				icon.style.marginBottom = "1px";
				icon.src = s["iconURL"];
				e.innerHTML += "<span style=\"flex : 1;height : 16px;line-height : 14px;\">" + s.name + "</span>";
			
				
				e.style.height = "auto";
				if (s["iconURLhover"] != null) {
					if (s["iconURLhover"] == "#inverted") {
						e.setAttribute("invertedonhover", "true");
						console.log("good");
					} else {
						e.addEventListener("mouseenter", function() {
							icon.src = s["iconURLhover"];
						});
						e.addEventListener("mouseenter", function() {
							icon.src = s["iconURL"];
						});
					}
				}
			} else {
				e.innerText = s.name;
			}
			if (s["shortcutText"] != null) {
				var marginleft = "9px";
				if (s["shortcutText"].toLowerCase().startsWith("<strong>")) {
					marginleft = "24px";
				}
				e.innerHTML += "<span style=\"max-width : 52px; min-width : 52px; white-space : nowrap; flex : 1;height : 16px;line-height : 14px; text-align : left; margin-left : " + marginleft + "\">" + s["shortcutText"] + "</span>";
				e.style.paddingRight = "0px";
			}

			function createTheOnClick(func) {
				if (enabled) {
					e.onclick = function() {
						event.stopPropagation();
						event.preventDefault();
						
							contextMenu.blur();
							func();
					};
				}
			}
			if (s["enabled"] !== null) {
				if (typeof(s["enabled"]) === "function") {
					if (s["enabled"]() == false) {
						e.setAttribute("disabled", "disabled");
						enabled = false;
					}
				} else {
					if (s["enabled"] == false) {
						e.setAttribute("disabled", "disabled");
						enabled = false;
					}
				}
			}
			createTheOnClick(s.click);
				
					
			contextMenu.appendChild(e);
		}
		
	}
	
	
	
	// elemParent.appendChild(contextMenu);
	document.body.appendChild(contextMenu);
	contextMenu.style.zIndex = 999999999999999999;
	if (clickEvent.pageY + contextMenu.clientHeight > document.body.clientHeight) {
		contextMenu.style.top = clickEvent.pageY - contextMenu.clientHeight + "px";
	} else {
		contextMenu.style.top = clickEvent.pageY + "px";
	}
	if (clickEvent.pageX + contextMenu.clientWidth > document.body.clientWidth) {
		contextMenu.style.left = clickEvent.pageX - contextMenu.clientHeight + "px";
	} else {
		contextMenu.style.left = clickEvent.pageX + "px";
	}
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
WindowAPI["httpGet"] = function(theUrl, callback, fromCache)
{
    let xmlhttp;
    
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", theUrl, false);
	if (!fromCache) xmlhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xmlhttp.send();
    
    return xmlhttp.response;
};
WindowAPI["loadProgram"] = {};
WindowAPI["loadProgram"]["fromURL"] = function(url, args, fromCache) {
	WindowAPI["loadingState"]["value"]++;
	WindowAPI["loadingState"]["apply"]();
	WindowAPI.httpGet(url, function(data) {
		eval(data.toString());
		WindowAPI["loadingState"]["value"]--;
		WindowAPI["loadingState"]["apply"]();
		try {
			main(args);
		} catch(e) {
			if (main == null) {
				WindowAPI.ShowError("Failed to start the program. No main function defined.", "Error", 0)
				return;
			}
		}
		delete main;
	}, fromCache);
};
WindowAPI["errorIcons"] = [["url('img/Icons/Icon_52.ico')", "sounds/Windows XP Exclamation.wav"], ["url('img/Icons/Icon_60.png')", "sounds/Windows XP Critical Stop.wav"], ["url('img/Icons/Icon_49.ico')", "sounds/Windows XP Exclamation.wav"]];
WindowAPI["ShowError"] = function(errorText, errorTitle, errorIconID) {
	var w = WindowAPI.CreateWindow(errorTitle);
	w.titlebar.max.style.display = "none";
	w.titlebar.min.style.display = "none";
	w.settings.canResize = false;
	var i = document.createElement("div");
	
	i.style.backgroundImage = WindowAPI["errorIcons"][errorIconID][0];
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

	var audio = new Audio(WindowAPI["errorIcons"][errorIconID][1]);
	audio.play();
}

WindowAPI["showLogonui"] = function() {
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
	// var logInUser = document.createElement("b");
	// logInUser.tabIndex = "0";
	// logInUser.innerText = "Log-in using text";
	// logInUser.style.textAlign = "left";

	WindowAPI["winlogon"]["login"] = function(userPath) {
		ntuserPath = WindowAPI.fileSystem.getPath(userPath + "/ntuser.json");
		function logIn() {
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
					WindowAPI.loadProgram.fromURL("js/soft/iexplore.js", {});
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
				WindowAPI.StartMenu.Add(languages[userData["selectedLanguage"]]["InternetExplorer"], whenProgramOpen, "img/Icons/iexplore48.png");
			}
			
			
			if (true) {
				function whenProgramOpen() {
					WindowAPI.loadProgram.fromURL("js/soft/doc.js", {})
				}
				
				WindowAPI.StartMenu.Add(languages[userData["selectedLanguage"]]["WebXP_Documentation"], whenProgramOpen, "img/Icons/notepad.ico");
				
				
			}
			
			
			//
			//DesktopFiles
			//
			WindowAPI["path"]["userprofile"] = userPath;
			WindowAPI["desktop"] = {};
			var winDesk = document.getElementById("Desktop");
			WindowAPI["desktop"]["refresh"]  = function() {
				var desktopPath = WindowAPI.fileSystem.getPath("%userprofile%/Desktop/");
				winDesk.childNodes.forEach(function(node) {
					node.remove();
				})
				fs.readdir(desktopPath, (err, files) => {
				if (err) throw err;
				files.forEach(file => {
					var desktopIcon = document.createElement("div");
					var desktopIconImage = document.createElement("icon");
					var desktopIconName = document.createElement("a");
					desktopIcon.tabIndex = 0;
					console.log(file);
					var fileExt = WindowAPI.fileSystem.getFileExt(file);
					if (Windows_Registry["FileExts"][fileExt]) {
						console.log(Windows_Registry["FileExts"][fileExt].f);
						desktopIconImage.style.backgroundImage = "url('" + Windows_Registry["FileExts"][fileExt].icon + "')";
						// img.src = "img/Icons/Icon_6.ico";
						desktopIcon.addEventListener("dblclick", function() {
							console.log("open");
							Windows_Registry["FileExts"][fileExt].defaultProgram(desktopPath + file);
						});
					} else {
						desktopIconImage.style.backgroundImage = "url('img/Icons/Icon_6.ico')";
					}
					
					desktopIconName.innerText = file;
					desktopIcon.appendChild(desktopIconImage);
					desktopIcon.appendChild(document.createElement("br"));
					desktopIcon.appendChild(desktopIconName);
					desktopIcon["filePath"] = desktopPath + file;
					desktopIcon.addEventListener("contextmenu", function(e) {
						var f = this.file;
						function whenClicked() {
							Windows_Registry["FileExts"][fileExt].defaultProgram(desktopPath + file);
						}
						
						function whenEditClicked() {
							Windows_Registry["FileExts"][fileExt].defaultEditProgram(desktopPath + file);
						}
						var cTextMenu = [
							{"name" : languages[userData["selectedLanguage"]]["open"], "click" : whenClicked},
							{"name" : languages[userData["selectedLanguage"]]["edit"], "click" : whenEditClicked}
						]
						
						console.log(cTextMenu);
						WindowAPI.showContextMenu(cTextMenu, this, event);
						e.preventDefault();
						e.stopPropagation();
					});
					winDesk.appendChild(desktopIcon);
				});
			  	});
			}
			winDesk.addEventListener("contextmenu", function(ev) {
				WindowAPI.showContextMenu([{
					"name" : "Refresh",
					"click" : () => WindowAPI.desktop.refresh()
				}], this, ev)
			})
			WindowAPI.desktop.refresh();
			d.remove();
		}
		

		if (ntuserPath) {
			fs.readFile(ntuserPath, 'utf8', function(err, data) {
				if (err) {
					console.log(err);
					return;
				}
				userData = JSON.parse(data.toString());
				
				logIn();
			});
		} else {
			logIn();
		}
	};


	if (!WindowAPI["isNode"]) {
		WindowAPI.winlogon.login("");
		return;
	}

	function getDirectories(path) {
		return fs.readdirSync(path).filter(function (file) {
		  return fs.statSync(path+'/'+file).isDirectory();
		});
	  }
	  
	  getDirectories("data/C/Documents And Settings/").forEach(function(directory) {
		// fs.readFileSync()
		if (directory != "default") {
			var NTUSERjson = JSON.parse(fs.readFileSync("data/C/Documents And Settings/" + directory + "/NTUSER.json"));
			
			var user = document.createElement("b");
			user.tabIndex = "0";
			user.innerText = NTUSERjson.username;
			user.style.textAlign = "left";
			cD.appendChild(user);
			user.addEventListener("click", function() {
				WindowAPI.winlogon.login("C:\\Documents And Settings\\" + directory);
				d.remove();
			});
		}
	  });

	document.body.appendChild(d);
	
	
	

};

WindowAPI["fileSystem"] = {};
WindowAPI["fileSystem"]["getFileFromPath"] = function() {
	
};
WindowAPI["regedit"] = {
	"HKEY_CURRENT_USER" : {
		"getValue" : function(valuePath, defaultValue) {
			var splittedDownValuePath = valuePath.replace("\\", "/").split("/");
			var currentNode = userData["HKEY_CURRENT_USER"];
			for(var i = 0; i < splittedDownValuePath.length; i++) {
				if (typeof(currentNode) !== "object") {
					return;
				}
				path = splittedDownValuePath[i];
				console.log(path);
				console.log(currentNode);
				if (!path) return;
				if (currentNode[path] == null) {
					currentNode[path] = ((i == splittedDownValuePath.length - 1) ? (defaultValue || {}) : {});
				}
				currentNode = currentNode[path.toString()];
			};
			return currentNode;
		}
	}
}
WindowAPI["fileSystem"]["getAllFilesInFolder"] = function(path, callback) {
	if (!WindowAPI["isNode"]) return [];
	fs.readdir("./data/" + path.replace(":", ""), callback);
}
WindowAPI["fileSystem"]["getPath"] = function(path) {
	var newPath = path;
	Object.keys(WindowAPI["path"]).forEach(function(pathKey) {
		newPath = newPath.replace("%" + pathKey + "%", WindowAPI["path"][pathKey]);
	});
	if (newPath.replace("\\", "/").startsWith("./data/")) {
		return newPath.replace("\\", "/").replace(":", "");
	} else {
		return "./data/" + newPath.replace("\\", "/").replace(":", "");
	}
}
WindowAPI["fileSystem"]["getFileExt"] = function(path) {
	var split = path.replace("\\", "/").split("/");
	var fileSplit = split[split.length - 1].split(".");
	if (fileSplit.length < 2) {
		return "";
	} else {
		return fileSplit[fileSplit.length - 1];
	}
}
WindowAPI.fileSystem["getFileNameWithoutExt"] = function(path) {
	var split = path.replace("\\", "/").split("/");
	var fileSplit = split[split.length - 1].split(".");
	if (fileSplit.length < 2) {
		return split[split.length - 1];
	} else {
		var nameArray = [];
		for(var i = 0; i < fileSplit.length - 1; i++) {
			nameArray.push(fileSplit[i]);
		}
		return nameArray.join(".");
	}
}
WindowAPI["fileSystem"]["getFileName"] = function(path) {
	var split = path.replace("\\", "/").split("/");
	return split[split.length - 1];
}
WindowAPI["winlogon"] = {};
