class CellClass {
	constructor(canvas, cell_manager, population_name, color, random_cell=true, pos=[], dead_color='white') {
	this.size = 20;
    this.population_name = population_name;
    this.cell_manager = cell_manager;
		this.dead_color = dead_color;
		this.canvas = canvas;
		this.color = color;
    if(random_cell == true) {
        this.x = Math.floor(Math.random() * canvas.width);
        this.y = Math.floor(Math.random() * canvas.height);
    } else {
      this.x = pos[0];
      this.y = pos[1];
    }
		
		this.alive = true;
		this.age = 0;
	}

	age_change() {
		this.age++;
	}

	draw() {
		let ctx = this.canvas.getContext("2d")
		if (this.alive) {
			ctx.fillStyle = this.color;
		} else {
			ctx.fillStyle = this.dead_color;
		}
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}

	update() {
		this.age_change();

		this.class_specific();

		this.draw();
	}
}


class Cell01 extends CellClass {
	constructor(canvas, cell_manager, color, target_age, death_chance, population_name) {
		super(canvas, cell_manager, color, population_name);
		this.target_age = target_age;
		this.death_chance = death_chance;
	}

	death_check() {
		if (this.alive == true) {
			if (this.age > this.target_age) {
				if(Math.random() < this.death_chance) {
					this.alive = false;
				}
				this.color = "red";
			}
		}
	}

	class_specific() {
		this.death_check();


	}
}


class GrowingCell01 extends CellClass {
  constructor(canvas, cell_manager, population_name, color, pos) {
    super(canvas, cell_manager, population_name, color, false, pos);
    this.placeholder_number = 0;
  }

	isSubArrayInArray(subArray, arrayOfArrays) {
	  return arrayOfArrays.some(arr => {
		return arr.every((element, index) => element === subArray[index]);
	  });
	}

	check_duplicate(point) {
		return this.isSubArrayInArray(point, this.cell_manager.get_cell_points())
	}

  check_point_grow(point) {
    if(this.age % 2 == 0) {
    
    if(this.placeholder_number >= 1) {
      let random_numb = Math.floor(Math.random() * 4);

      // Left
      let all_points = this.cell_manager.get_cell_points();
      let new_point = [];

      if(random_numb == 0) {
        
        new_point = [point[0]-this.size, point[1]];
        if(this.check_duplicate(new_point) == false) {
			if(this.check_within_bounds(new_point) == false) {
				this.cell_manager.add_to_population(this.population_name, GrowingCell01, [this.population_name, 'orange', new_point]);
			}
        }

      } else if(random_numb == 1) {

        // Right
        new_point = [point[0]+this.size, point[1]];
        if(this.check_duplicate(new_point) == false) {
			if(this.check_within_bounds(new_point) == false) {
				this.cell_manager.add_to_population(this.population_name, GrowingCell01, [this.population_name, 'orange', new_point]);
			}
        }
      } else if(random_numb == 2) {
        // Up

        new_point = [point[0], point[1]-this.size];
        if(this.check_duplicate(new_point) == false) {
			if(this.check_within_bounds(new_point) == false) {
				this.cell_manager.add_to_population(this.population_name, GrowingCell01, [this.population_name, 'orange', new_point]);
			}
        }
      } else if(random_numb == 3) {
        // Down

        new_point = [point[0], point[1]+this.size];
        if(this.check_duplicate(new_point) == false) {
			if(this.check_within_bounds(new_point) == false) {
				this.cell_manager.add_to_population(this.population_name, GrowingCell01, [this.population_name, 'orange', new_point]);
			}
        }
      }
      
      
    }
    
      this.placeholder_number++;
    }
  }
    

  
  check_within_bounds(point) {
    if(point[0] < 0 || point[0] > this.canvas.width - this.size || point[1] < 0 || point[1] > this.canvas.height - this.size) {
      return true;
    }
	return false;
  }


  reproduce() {
    this.check_point_grow([this.x, this.y]);
  }

  class_specific() {
	if(this.check_within_bounds([this.x, this.y])) {
		this.alive = false;
	}
    
    
    this.reproduce();


  }
}
























class GrowingCell02 extends CellClass {
  constructor(canvas, cell_manager, population_name, genetics, color, pos) {
	super(canvas, cell_manager, population_name, color, false, pos);
	this.placeholder_number = 0;
	this.genetics = genetics;
	this.kill_next = false;
  }

	isSubArrayInArray(subArray, arrayOfArrays) {
	  return arrayOfArrays.some(arr => {
		return arr.every((element, index) => element === subArray[index]);
	  });
	}

	check_duplicate(point) {
		return this.isSubArrayInArray(point, this.cell_manager.get_cell_points())
	}

	check_point_grow(point) {
		if (this.age % 2 == 0) {

		  if (this.placeholder_number >= 1) {
			let random_numb = Math.floor(Math.random() * 4);
			let all_points = this.cell_manager.get_cell_points();
			let new_point = [];

			if (random_numb == 0) {
			  // Left
			  new_point = [point[0] - this.size, point[1]];
			} else if (random_numb == 1) {
			  // Right
			  new_point = [point[0] + this.size, point[1]];
			} else if (random_numb == 2) {
			  // Up
			  new_point = [point[0], point[1] - this.size];
			} else if (random_numb == 3) {
			  // Down
			  new_point = [point[0], point[1] + this.size];
			}

			if (this.check_duplicate(new_point) == false && this.check_outside_bounds(new_point, [[0, this.canvas.width], [0, this.canvas.height]]) == false) {
			  this.cell_manager.add_to_population(this.population_name, GrowingCell02, [this.population_name, this.pass_down_genetics(), this.color, new_point]);
			}
		  }

		  this.placeholder_number++;
		}
	  }


  pass_down_genetics() {
	const MUTATION_CHANCE = .1; // 10% mutation chance

	let new_genetics = this.genetics;

	if (Math.random() < MUTATION_CHANCE) {
		const MIN_MUTATION = -50;
		const MAX_MUTATION = 100;
		
		const mutation = (Math.random() * (MAX_MUTATION - MIN_MUTATION)) + MIN_MUTATION;
		
		// Apply the mutation to the "antibio_resistance" property
		new_genetics["antibio_resistance"] += mutation;


		if(new_genetics["antibio_resistance"] < 0) {
			new_genetics["antibio_resistance"] = 0;
		}
	}
	return new_genetics;
  }

  check_outside_bounds(point, bounds) {
	if(point[0] < bounds[0][0] || point[0] > bounds[0][1] - this.size || point[1] < bounds[1][0] || point[1] > bounds[1][1] - this.size) {
	  return true;
	}
	return false;
  }


  reproduce() {
	this.check_point_grow([this.x, this.y]);
  }

  class_specific() {
	// Output average antibio resistance
	document.getElementById("output_text_2").innerText = `Average Antibio Resistance: ${(this.cell_manager.get_cell_antibio_resistances().reduce((acc, num) => acc + num, 0) / this.cell_manager.get_cell_antibio_resistances().length).toFixed(2)}`;
	  
	if(this.check_outside_bounds([this.x, this.y], [[0, this.canvas.width], [0, this.canvas.height]])) {
		this.alive = false;
	}

	if(this.kill_next == true) {
		this.alive = false;
		this.kill_next = false;
	}


	// Border Logics
	if(this.check_outside_bounds([this.x, this.y], [[200, 400], [0, this.canvas.height]]) == false) {
		if(this.genetics["antibio_resistance"] < 500) {
			this.kill_next = true;
			this.dead_color = "#DDF2FD";
		}
	}

	if(this.check_outside_bounds([this.x, this.y], [[400, 600], [0, this.canvas.height]]) == false) {
	  if(this.genetics["antibio_resistance"] < 2000) {
		  this.kill_next = true;
		  this.dead_color = "#9BBEC8";
	  }
	}


	if(this.check_outside_bounds([this.x, this.y], [[600, 800], [0, this.canvas.height]]) == false) {
		if(this.genetics["antibio_resistance"] < 8000) {
			this.kill_next = true;
			this.dead_color = "#427D9D";
		}
	}

	if(this.check_outside_bounds([this.x, this.y], [[800, this.canvas.width], [0, this.canvas.height]]) == false) {
	  if(this.genetics["antibio_resistance"] < 15000) {
		  this.kill_next = true;
		  this.dead_color = "#164863";
	  }
	}

	if(this.alive == true) {
		this.reproduce();
	}
	
  }
}