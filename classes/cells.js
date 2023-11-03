class CellClass {
	constructor(canvas, color) {
		this.canvas = canvas;
		this.color = color;
		this.x = Math.floor(Math.random() * canvas.width);
		this.y = Math.floor(Math.random() * canvas.height);
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
		ctx.fillRect(this.x, this.y, 3, 3);
	}

	update() {
		this.age_change();

		this.class_specific();

		this.draw();
	}
}


class Cell01 extends CellClass {
	constructor(canvas, color, target_age, death_chance) {
		super(canvas, color);
		this.target_age = target_age;
		this.death_chance = death_chance;
	}

	death_check() {
		if (this.alive == true) {
			if (this.age > this.target_age && Math.random() < this.death_chance) {
				this.alive = false;
			}
		}
	}

	class_specific() {
		this.death_check();


	}
}