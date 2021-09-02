
function launchLatestProgram() {
	var w = WindowAPI.CreateWindow('test');
	var b = document.createElement('xpButton');
	b.tabIndex = 0;
	// b.addEventListener("click", function() {
		// var jsonContextMenu = [
			// {"name" : "Test"}
		// ];
		// jsonContextMenu[0]["click"] = function() {
			// alert('Test');
		// };
		// WindowAPI.showContextMenu(jsonContextMenu, this, event);
	// });
	b.innerText = "Is this button a Jojo reference ?";
	w.content.appendChild(b);
}

launchLatestProgram();