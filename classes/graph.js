class Graph {
	constructor(canvas, color='black', background_color='white') {
		this.canvas = canvas;
		this.color = color;
		this.background_color = background_color;
		this.data = [];
	}

	update(x, y) {
		this.data.push([x, y]);
		let ctx = this.canvas.getContext('2d');

		ctx.strokeStyle = this.color;
		ctx.beginPath();

		if (this.data.length > 0) {
			ctx.moveTo(this.data[0][0], this.data[0][1]);
			for (let i = 1; i < this.data.length; i++) {
				ctx.lineTo(this.data[i][0], this.canvas.height - this.data[i][1]/10);
			}
		}

		ctx.stroke();
	}
}