import colors from '/color_import/colors.js';

let canvas = document.getElementById("life_canvas");
let graph_canvas = document.getElementById("graph_01");
let graph_canvas_02 = document.getElementById("graph_02");
let cell_number = 0;
let cell_population_name = `Cell${cell_number}`;

/*
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
*/

canvas.width = 1000;
canvas.height = 300;

const CellManager_01 = new CellManager(canvas);
const Graph_01 = new Graph(graph_canvas, 'black');
const Graph_02 = new Graph(graph_canvas_02, 'black');

let time = 0;
let cell_count = 0;
let avg_antibio_res = 10.00;




function MainLoopStep() {
	CellManager_01.update();
	if(cell_number != 0) {
		cell_count = document.getElementById('output_text').innerText.substring(11);
		time += 0.1;
		Graph_01.update(time, cell_count);


		avg_antibio_res = document.getElementById('output_text_2').innerText.substring(28);

		Graph_02.update(time, avg_antibio_res/30);
	}
	
}



const interval = 25;
setInterval(MainLoopStep, interval);


document.addEventListener("keydown", function(event) {
	if(event.key === "j") {
		let antibio_resistance = Math.round(document.getElementById('antibio_res_text').innerText.substring(20));
		let color = document.getElementById('color_text').innerText.substring(7);
		let pos = document.getElementById('position_text').innerText.match(/\(([^,]+),\s*([^)]+)\)/);
		pos = [pos[1] * 20, pos[2] * 20]
		
		cell_population_name = `Cell${cell_number}`;
		CellManager_01.add_population(
			cell_population_name, 
			GrowingCell02, 
			[
				cell_population_name, 
			 	{
					antibio_resistance: antibio_resistance
				}, 
				color, 
				pos
			], 
			1
		);
		cell_number++;
	}
	if(event.key === 'r') {
		CellManager_01.populations = {};
		CellManager_01.update();
		cell_count = 0;
		time = 0;
		avg_antibio_res = 0;
		Graph_01.data = [];
		Graph_02.data = [];
		Graph_01.canvas.getContext('2d').clearRect(0, 0, Graph_01.canvas.width, Graph_01.canvas.height);
		Graph_02.canvas.getContext('2d').clearRect(0, 0, Graph_02.canvas.width, Graph_02.canvas.height);
		document.getElementById("output_text_2").innerText = "Average Antibio Resistance: 10.00";
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