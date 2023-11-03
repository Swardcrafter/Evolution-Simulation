let canvas = document.getElementById("life_canvas")

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

const CellManager_01 = new CellManager(canvas);

function MainLoopStep() {
	CellManager_01.update();
}

const interval = 100; // 100ms
const main_loop_inverval = setInterval(MainLoopStep, interval);


document.addEventListener("keydown", function(event) {
	if (event.key === "J" || event.key === "j") {
		CellManager_01.add_population("Cell01 Population", Cell01, [50, 50], 300);
	}
});