import colors from '/color_import/colors.js';

let canvas = document.getElementById("life_canvas");
let cell_number = 0;
let cell_population_name = `Cell${cell_number}`;

/*
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
*/

canvas.width = 50;
canvas.height = 100;

const CellManager_01 = new CellManager(canvas);

function MainLoopStep() {
	CellManager_01.update();
}

const interval = 100; // 100ms
setInterval(MainLoopStep, interval);


document.addEventListener("click", function(event) {
	cell_population_name = `Cell${cell_number}`;
CellManager_01.add_population(cell_population_name, GrowingCell01, [cell_population_name, 'orange', [0, 0]], 1);
	cell_number++;
});



document.addEventListener("keydown", function(event) {
	if (event.key === "J" || event.key === "j") {
		cell_population_name = `Cell${cell_number}`;
    CellManager_01.add_population(cell_population_name, GrowingCell01, [cell_population_name, 'orange', [25, 50]], 1);
		cell_number++;
	}
  if(event.key === " ") {
    canvas.width += 10;
    canvas.height += 20;
    CellManager_01.update();
  }
});