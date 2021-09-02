function startLatestProgram() {
	var w = WindowAPI.CreateWindow("Mario Bros HTML5");
	var i = document.createElement("iframe");
	w.content.appendChild(i);
	i.style.boxSizing = "border-box";
	i.style.width = "100%";
	i.style.height = "100%";
	i.src = "https://supermarioemulator.com/mario.php";
	w.focus();
}

startLatestProgram();