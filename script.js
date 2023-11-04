import colors from '/color_import/colors.js';

let canvas = document.getElementById("life_canvas");
let cell_number = 0;
let cell_population_name = `Cell${cell_number}`;

/*
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
*/

canvas.width = 1000;
canvas.height = 300;

const CellManager_01 = new CellManager(canvas);

function MainLoopStep() {
	CellManager_01.update();
}



const interval = 25;
setInterval(MainLoopStep, interval);


document.addEventListener("keydown", function(event) {
	if(event.key === "j") {
		cell_population_name = `Cell${cell_number}`;
		CellManager_01.add_population(
			cell_population_name, 
			GrowingCell02, 
			[
				cell_population_name, 
			 	{
					antibio_resistance: 10
				}, 
				'orange', 
				[0, 0]
			], 
			1
		);
		cell_number++;
	}
});


/*

document.addEventListener("keydown", function(event) {
	if (event.key === "J" || event.key === "j") {
		cell_population_name = `Cell${cell_number}`;
    CellManager_01.add_population(cell_population_name, GrowingCell01, [cell_population_name, 'orange', [30, 50]], 1);
		cell_number++;
	}
  if(event.key === " ") {
    canvas.width += 10;
    canvas.height += 20;
    CellManager_01.update();
  }
});

*/