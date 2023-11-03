class Cell {
  constructor(canvas) {
	this.canvas = canvas;
	this.x = Math.floor(Math.random() * canvas.width);
	this.y = Math.floor(Math.random() * canvas.height);
	this.alive = true;
	this.age = 0;
  }

  age_change() {
	this.age++;
	if (this.alive == true) {
	  if (this.age > 50 && Math.random() < 0.1) {
		this.alive = false;
	  }
	}
  }

  draw() {
	let ctx = this.canvas.getContext("2d")
	if (this.alive) {
	  ctx.fillStyle = "black";
	} else {
	  ctx.fillStyle = "white";
	}
	ctx.fillRect(this.x, this.y, 10, 10);
  }

  play_step() {
	this.age_change();

	this.draw();
  }
}