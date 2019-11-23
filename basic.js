var stage = document.getElementById('stage');
var ctx = stage.getContext("2d");

var level = [5][5] = 0;

var sqrX = 10;
var sqrY = 10;


window.onload = function () {
    setInterval(game, 80);
}

function game() {
    //sqrX = --sqrX;
    sqrY = ++sqrY;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, stage.width, stage.height);

    drawBoard();

    ctx.fillStyle = "red";
    ctx.fillRect(sqrX * 5, sqrY * 5, 100, 100);
}

function drawBoard() {
    // Box width
    var bw = 400;
    // Box height
    var bh = 400;
    // Padding
    var p = 50;

    for (var x = 0; x <= bw; x += 40) {
        ctx.moveTo(0.5 + x + p, p);
        ctx.lineTo(0.5 + x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += 40) {
        ctx.moveTo(p, 0.5 + x + p);
        ctx.lineTo(bw + p, 0.5 + x + p);
    }
    ctx.strokeStyle = "white";
    ctx.stroke();
}
