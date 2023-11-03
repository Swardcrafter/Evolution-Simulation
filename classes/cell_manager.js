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