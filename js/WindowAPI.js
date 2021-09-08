

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
				if (s["shortcutText"] != null) {
					e.innerHTML += "<span style=\"max-width : min-content; min-width : min-content; white-space : nowrap; flex : 1;height : 16px;line-height : 14px; text-align : right; margin-left : 35px\">" + s["shortcutText"] + "</span>";
					e.style.paddingRight = "13px";
				}
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
	WindowAPI.httpGet(url, function(data) {
		eval(data.toString());
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