let canvas = document.getElementById("life_canvas")

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;


let cell1 = new Cell(canvas);


var myInterval = setInterval(function() {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  cell1.play_step()
}, 100);
