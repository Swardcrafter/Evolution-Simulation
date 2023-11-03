class CellClass {
	constructor(canvas, cell_manager, population_name, color, random_cell=true, pos=[]) {
    this.population_name = population_name;
    this.cell_manager = cell_manager;
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
			ctx.fillStyle = "white";
		}
		ctx.fillRect(this.x, this.y, 10, 10);
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

  check_point_grow(point) {
    if(this.age % 2 == 0) {
    
    if(this.placeholder_number >= 1) {
      let random_numb = Math.floor(Math.random() * 4);

      // Left
      let all_points = this.cell_manager.get_cell_points();
      let new_point = [];

      if(random_numb == 0) {
        
      
        new_point = [point[0]-10, point[1]];
        if(all_points.includes(new_point) == false) {
          this.cell_manager.add_to_population(this.population_name, GrowingCell01, [this.population_name, 'orange', new_point]);
          
        }

      } else if(random_numb == 1) {

        // Right
        new_point = [point[0]+10, point[1]];
        if(all_points.includes(new_point) == false) {
          this.cell_manager.add_to_population(this.population_name, GrowingCell01, [this.population_name, 'orange', new_point]);

        }
      } else if(random_numb == 2) {
        // Up

        new_point = [point[0], point[1]-10];
        if(all_points.includes(new_point) == false) {
          this.cell_manager.add_to_population(this.population_name, GrowingCell01, [this.population_name, 'orange', new_point]);

        }
      } else if(random_numb == 3) {
        // Down

        new_point = [point[0], point[1]+10];

        if(all_points.includes(new_point) == false) {
          this.cell_manager.add_to_population(this.population_name, GrowingCell01, [this.population_name, 'orange', new_point]);

        }
      }
      
      
    }
    
      this.placeholder_number++;
    }
  }
    

  
  check_within_bounds() {
    if(this.x < 0 || this.x > this.canvas.width - 10 || this.y < 0 || this.y > this.canvas.height - 10) {
      this.alive = false;
    }
  }


  reproduce() {
    this.check_point_grow([this.x, this.y]);
  }

  class_specific() {
    
    this.check_within_bounds();
    
    this.reproduce();


  }
}
