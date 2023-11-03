class CellManager {
	constructor(canvas) {
		this.canvas = canvas;
		this.populations = {};
	}

	add_population(name, class_, args=[], size = 100) {
		let population = []
		

		for(let i = 0; i < size; i++) {
			population.push(new class_(this.canvas, ...args));
		}

		this.populations[name] = population;
	}


	update() {
		let ctx = this.canvas.getContext('2d');
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		
		for (const pop_name in this.populations) {
			const population = this.populations[pop_name];
			for (const class_ of population) {
				class_.update();
			}
		}
	}
}