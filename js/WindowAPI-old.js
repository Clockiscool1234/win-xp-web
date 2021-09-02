var WindowAPI_borderwidth = 8;
var WindowAPI_zIndex = 0;
function WindowAPI_OnMouseOver(w, event) {
	if (w == event.target && w.settings.canResize && w.className == "") {
		var pos = {
			"X" : event.pageX - parseInt(w.style.left),
			"Y" : event.pageY - parseInt(w.style.top)
		}
		w.style.cursor = "var(--default-cursor)";
		if (pos.X < WindowAPI_borderwidth) w.style.cursor = "var(--horizontal-resize)";
		if (pos.Y < WindowAPI_borderwidth) w.style.cursor = "var(--vertical-resize)";
		if (pos.X > parseInt(w.style.width) - WindowAPI_borderwidth) w.style.cursor = "var(--horizontal-resize)";
		if (pos.Y > parseInt(w.style.height) - WindowAPI_borderwidth) w.style.cursor = "var(--vertical-resize)";
		
		if (pos.X < WindowAPI_borderwidth && pos.Y < WindowAPI_borderwidth) w.style.cursor = "var(--diagonal-resize)";
		if (pos.Y < WindowAPI_borderwidth && pos.X > parseInt(w.style.width) - WindowAPI_borderwidth) w.style.cursor = "var(--diagonal-two-resize)";
		if (pos.X > parseInt(w.style.width) - WindowAPI_borderwidth && pos.Y > parseInt(w.style.height) - WindowAPI_borderwidth) w.style.cursor = "var(--diagonal-resize)";
		if (pos.Y > parseInt(w.style.height) - WindowAPI_borderwidth && pos.X < WindowAPI_borderwidth) w.style.cursor = "var(--diagonal-two-resize)";
	} else {
		w.style.cursor = "var(--default-cursor)";
	}
}

function WindowAPI_StartMoving(w, e) {
	WindowAPI_zIndex++;
	w.style.zIndex = WindowAPI_zIndex;
	var pos = {
		"X" : event.pageX - parseInt(w.style.left),
		"Y" : event.pageY - parseInt(w.style.top)
	}
	if (w == event.target) {
		if (pos.X >= WindowAPI_borderwidth && pos.Y >= WindowAPI_borderwidth && pos.X <= parseInt(w.style.width) - WindowAPI_borderwidth && pos.Y <= parseInt(w.style.height) - WindowAPI_borderwidth) {
			function WindowAPI_WindowMove(e2) {
				w.style.left = (parseInt(e2.pageX) - pos.X) + "px";
				w.style.top = (parseInt(e2.pageY) - pos.Y) + "px";
			}
			
			document.body.addEventListener("mouseup", function() {
				document.body.removeEventListener("mousemove", WindowAPI_WindowMove);
			});
			document.body.addEventListener("mousemove", WindowAPI_WindowMove);
		} else {
			if (pos.X < WindowAPI_borderwidth && w.settings.canResize) {
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
			if (pos.Y < WindowAPI_borderwidth && w.settings.canResize) {
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
			if (pos.X > parseInt(w.style.width) - WindowAPI_borderwidth && w.settings.canResize) {
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
			if (pos.Y > parseInt(w.style.height) - WindowAPI_borderwidth && w.settings.canResize) {
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
		
}

function WindowAPI_CreateWindow(name, autoFocus) {
	var w = document.createElement("window");
	document.body.getElementsByTagName("WindowManager")[0].appendChild(w);


	w.tabIndex = 0;
	w.addEventListener("mousedown", function() {
		WindowAPI_StartMoving(this, event);
	});
	w.addEventListener("mousemove", function() {
		WindowAPI_OnMouseOver(this, event);
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
	
	
	var t = document.createElement("titlebar");
	w.appendChild(t);
	var title = document.createElement("title");
	if (name) {
		title.innerText = name;
	}
	var closebutton = document.createElement("closeButton");
	closebutton.addEventListener("mouseover", function() {this.title = languages[selectedLanguage]['Close']});
	var maxbutton = document.createElement("maxButton");
	maxbutton.addEventListener("mouseover", function() {this.title = languages[selectedLanguage]['Maximize']});
	var minbutton = document.createElement("minButton");
	minbutton.addEventListener("mouseover", function() {this.title = languages[selectedLanguage]['Minimize']});
	t.appendChild(closebutton);
	closebutton.addEventListener("click", function() {
		WindowAPI_CloseWindow(w);
	});
	t.appendChild(maxbutton);
	maxbutton.addEventListener("click", function() {
		WindowAPI_MaxWindow(w);
	});
	t.appendChild(minbutton);
	t.appendChild(title);
	
	var content = document.createElement("content");
	w.appendChild(content);
	w.content = content;
	
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
	
	WindowAPI_zIndex++;
	w.style.zIndex = WindowAPI_zIndex;
	
	w.setTitle = function(newT) {
		title.innerText = newT;
	};
	
	if (autoFocus) {
		WindowAPI_zIndex++;
		w.style.zIndex = WindowAPI_zIndex;
	}
	return w;
}

function WindowAPI_MaxWindow(w) {
		
	if (w.settings.canResize) {
		if (w.className == "maxWindow") {
			w.className = "";
		} else {
			w.className = "maxWindow";
		}
	}
}

function WindowAPI_CloseWindow(w) {
	if (w.onclose) {
		if (!w.onclose()) {
			return;
		}
	}
	w.remove()
}
