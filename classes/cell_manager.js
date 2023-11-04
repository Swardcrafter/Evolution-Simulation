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


	get_cell_antibio_resistances() {
		let points = [];

		for (const [key, value] of Object.entries(this.populations)) {
		  for(let i = 0; i < value.length; i++) {
			if(value[i].alive == true) {
			  points.push(value[i].genetics["antibio_resistance"]);
			}

		  }
		}

		return points
	  }

	/*
	removeDuplicates(arr) {
	  var seen = {};
	  var uniquePoints = [];
	  var duplicateIndices = {};

	  for (var i = 0; i < arr.length; i++) {
		var instance = arr[i];
		var point = [instance.x, instance.y];

		// Check if the point is a duplicate
		if (seen[point]) {
		  if (duplicateIndices[seen[point]] === undefined) {
			duplicateIndices[seen[point]] = [seen[point]];
		  }
		  duplicateIndices[seen[point]].push(i);

		  // Set the 'alive' property to false for duplicates (except the first one)
		  instance.alive = false;
		} else {
		  seen[point] = i;
		  uniquePoints.push(point);
		}
	  }

	  return arr;
	}
 	*/




	update() {
		let ctx = this.canvas.getContext('2d');
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Draw Colors for Different Levels of AntiBio
		ctx.fillStyle = '#DDF2FD';  // Light blue
		ctx.fillRect(200, 0, 200, this.canvas.height);

		ctx.fillStyle = '#9BBEC8';  // Another shade of blue
		ctx.fillRect(400, 0, 200, this.canvas.height);

		ctx.fillStyle = '#427D9D';  // Darker blue
		ctx.fillRect(600, 0, 200, this.canvas.height);

		ctx.fillStyle = '#164863';  // Even darker blue
		ctx.fillRect(800, 0, this.canvas.width - 800, this.canvas.height);


	    let point_numbers = 0;
		let point_numbers_2 = 0;
		
		for (const pop_name in this.populations) {
			let population = this.populations[pop_name];
			for (const class_ of population) {
				point_numbers_2++;
		        if(class_.alive == true) {
		          class_.update();
		          point_numbers++;
		        }
			}
		}

    document.getElementById("output_text").innerText = `Cell Count: ${point_numbers}`;
	}
}