let canvas = document.getElementById("life_canvas")

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

const CellManager = new CellManager(canvas);

function MainLoopStep() {
	CellManager.update();
}

const interval = 100; // 100ms
const main_loop_inverval = setInterval(MainLoopStep, mainLoopInterval);


document.addEventListener("keydown", function(event) {
	if (event.key === "J" || event.key === "j") {
		CellManager.add_population("Cell01 Population", Cell01, [50, 50], 300);
	}
});