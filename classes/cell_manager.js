class CellManager {
	constructor(canvas) {
		this.canvas = canvas;
		this.populations = {};
	}

	add_population(name, class_, args=[], size = 100) {
		let population = []


		for(let i = 0; i < size; i++) {
			population.push(new class_(this.canvas, this, ...args));
		}

		this.populations[name] = population;
	}

  add_to_population(name, class_, args=[]) {
    this.populations[name].push(new class_(this.canvas, this, ...args));
  }

  get_cell_points() {
    let points = [];

    for (const [key, value] of Object.entries(this.populations)) {
      for(let i = 0; i < value.length; i++) {
        if(value[i].alive == true) {
          points.push([value[i].x, value[i].y]);
        }
        
      }
    }
    return points
  }

  removeDuplicates(arr) {
    console.log(JSON.stringify(arr));


    var seen = {}; // object to store the encountered elements

    for (var i = 0; i < arr.length; i++) {
      if (seen[arr[i]]) {
        arr.splice(i, 1);
        i--;
      }
      seen[arr[i]] = true;
    }

    return arr;
  }


	update() {
		let ctx = this.canvas.getContext('2d');
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let point_numbers = 0;
		
		for (const pop_name in this.populations) {
			let population = this.populations[pop_name];
			for (const class_ of population) {
        if(class_.alive == true) {
          class_.update();
          point_numbers++;
          
        }
				
			}
		}

    document.getElementById("output_text").innerText = point_numbers;
	}
}