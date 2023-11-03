import colors from './imports/colors.js';

let canvas = document.getElementById("life_canvas");
let cell_number = 0;
let cell_population_name = `Cell${cell_number}`;


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
		cell_population_name = `Cell${cell_number}`;
		let color = colors[Math.floor(Math.random() * colors.length)];
		CellManager_01.add_population(cell_population_name, Cell01, [color, 50, 30], 300);
		cell_number++;
	}
});